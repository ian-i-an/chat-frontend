import { useEffect } from "react";

const IN_APP_BROWSER_PATTERN =
  /Twitter|FBAN|FBAV|Instagram|KAKAOTALK|Line|NAVER|Daum/i;

function needsKeyboardInset() {
  const userAgent = navigator.userAgent;
  return IN_APP_BROWSER_PATTERN.test(userAgent);
}

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
    const shouldApplyInset = needsKeyboardInset();

    const update = () => {
      if (!shouldApplyInset) {
        root.style.setProperty("--keyboard-height", "0px");
        return;
      }

      const keyboard = vv ? Math.max(0, window.innerHeight - vv.height) : 0;
      root.style.setProperty("--keyboard-height", `${keyboard}px`);
    };

    update();

    // resize(키보드 열림/닫힘) 에서만 갱신한다. scroll 에서 갱신하면 채팅을
    // 스크롤할 때 innerHeight 와 vv.height 가 순간적으로 어긋나 키보드 높이가
    // 크게 튀고, 입력창이 위로 솟구친다.
    if (vv) {
      vv.addEventListener("resize", update);
    }

    return () => {
      if (vv) {
        vv.removeEventListener("resize", update);
      }
      // 채팅 화면을 떠날 때 값이 남지 않도록 초기화한다.
      root.style.setProperty("--keyboard-height", "0px");
    };
  }, []);
}
