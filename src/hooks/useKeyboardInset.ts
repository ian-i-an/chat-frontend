import { useEffect } from "react";

/**
 * 키보드가 가린 화면 하단 높이를 측정해 CSS 변수 --keyboard-height 로 노출한다.
 * 채팅 화면(Room)에서만 mount 해서, 입력창을 그 높이만큼 위로 올리는 데 쓴다.
 *
 * iOS 인앱 브라우저(트위터 등)는 키보드가 떠도 dvh/vh 가 줄지 않고, 포커스된
 * input 을 키보드 위로 자동으로 올려주지도 않는다. 키보드가 가린 높이는
 * visualViewport 로만 알 수 있다 (innerHeight - visualViewport.height).
 *
 * 전역 레이아웃이나 position:fixed 는 건드리지 않으므로, 다른 화면(바텀시트 등)
 * 동작이나 caret 위치에는 영향을 주지 않는다.
 */
export function useKeyboardInset() {
  useEffect(() => {
    const vv = window.visualViewport;
    const root = document.documentElement;

    const measure = () =>
      vv ? Math.round(Math.max(0, window.innerHeight - vv.height)) : 0;

    const apply = () => {
      root.style.setProperty("--keyboard-height", `${measure()}px`);
    };

    let rafId = 0;

    // 인앱 브라우저는 입력창 탭 직후 키보드 높이를 늦게, resize 이벤트 없이
    // 갱신할 때가 있다. 포커스되면 매 프레임 재측정하다가, 값이 더 이상
    // 변하지 않고 안정되면 멈춘다. (계속 폴링하면 스크롤 시 값이 튀므로
    // 안정된 뒤에는 멈춰서 resize 이벤트에만 의존한다.)
    const trackUntilStable = () => {
      cancelAnimationFrame(rafId);
      const start = performance.now();
      let last = -1;
      let stableFrames = 0;

      const tick = () => {
        apply();
        const kb = measure();
        if (kb === last) {
          stableFrames += 1;
        } else {
          stableFrames = 0;
          last = kb;
        }

        const settled = kb > 0 && stableFrames > 5;
        if (settled || performance.now() - start > 1500) return;
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    apply();

    // 키보드 열림/닫힘은 resize 로 잡는다. (scroll 은 채팅 스크롤 중 값이
    // 튀어 입력창이 솟구치므로 쓰지 않는다.)
    if (vv) {
      vv.addEventListener("resize", apply);
    }
    // 입력창 포커스 직후의 지연 갱신을 프레임 단위로 따라잡는다.
    window.addEventListener("focusin", trackUntilStable);

    return () => {
      cancelAnimationFrame(rafId);
      if (vv) {
        vv.removeEventListener("resize", apply);
      }
      window.removeEventListener("focusin", trackUntilStable);
      // 채팅 화면을 떠날 때 값이 남지 않도록 초기화한다.
      root.style.setProperty("--keyboard-height", "0px");
    };
  }, []);
}
