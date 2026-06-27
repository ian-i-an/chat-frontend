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

    const timers: number[] = [];

    const update = () => {
      const keyboard = vv ? Math.max(0, window.innerHeight - vv.height) : 0;
      root.style.setProperty("--keyboard-height", `${keyboard}px`);
    };

    // 인앱 브라우저는 키보드 애니메이션 중간값에서 resize 가 멈출 때가 있다.
    // 포커스 직후 여러 번 재측정해 키보드가 완전히 올라온 최종 높이를 잡는다.
    const remeasure = () => {
      update();
      timers.push(window.setTimeout(update, 100));
      timers.push(window.setTimeout(update, 300));
      timers.push(window.setTimeout(update, 500));
    };

    update();

    if (vv) {
      vv.addEventListener("resize", update);
      vv.addEventListener("scroll", update);
    }
    window.addEventListener("focusin", remeasure);

    return () => {
      if (vv) {
        vv.removeEventListener("resize", update);
        vv.removeEventListener("scroll", update);
      }
      window.removeEventListener("focusin", remeasure);
      timers.forEach(clearTimeout);
      // 채팅 화면을 떠날 때 값이 남지 않도록 초기화한다.
      root.style.setProperty("--keyboard-height", "0px");
    };
  }, []);
}
