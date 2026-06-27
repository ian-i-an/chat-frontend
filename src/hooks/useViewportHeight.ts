import { useEffect } from "react";

/**
 * 키보드가 올라올 때 실제로 보이는 영역(visual viewport)에 맞춰
 * 앱 높이를 보정한다.
 *
 * iOS의 dvh/100vh는 주소창 같은 브라우저 UI만 반영하고 키보드는 반영하지
 * 않는다. 사파리는 포커스된 input을 자동으로 화면 안으로 스크롤해주지만,
 * 트위터(X) 같은 인앱 브라우저(WKWebView)는 이 보정이 동작하지 않아
 * 키보드가 input을 그대로 가려버린다.
 *
 * window.visualViewport로 실제 가시 높이를 직접 측정해 CSS 변수
 * (--app-height)에 반영하면, 키보드가 올라와도 앱 전체가 키보드 위
 * 영역에 맞게 줄어들어 input이 항상 보인다.
 *
 * 또한 iOS는 키보드가 뜰 때 focus된 input을 보여주려고 문서를 강제로
 * 스크롤하는데, input이 position:fixed 컨테이너(#root) 안에 있으면 input은
 * 안 움직이는 대신 caret(커서)만 그 스크롤량(window.scrollY)만큼 아래로
 * 어긋난다. 문서를 즉시 맨 위로 되돌려 caret을 input 안에 맞춘다.
 */
export function useViewportHeight() {
  useEffect(() => {
    const vv = window.visualViewport;

    // 모든 관련 이벤트에서 측정 + 스크롤 고정을 한 번에 처리한다.
    // 따로 두면 스크롤을 0으로 되돌린 직후 키보드 높이가 재계산되지 않아
    // 바텀시트가 잘못된 값에 멈춰버린다(화면을 만져야 풀리던 버그).
    const sync = () => {
      const height = vv ? vv.height : window.innerHeight;
      // 키보드가 가린 하단 높이. fixed bottom-0 요소(바텀시트 등)를 이만큼
      // 띄워야 키보드 위에 보인다. 스크롤을 항상 0으로 고정하므로
      // offsetTop 은 고려하지 않는다(고려하면 전환 중 값이 흔들린다).
      const keyboard = vv ? Math.max(0, window.innerHeight - vv.height) : 0;

      const root = document.documentElement;
      root.style.setProperty("--app-height", `${height}px`);
      root.style.setProperty("--keyboard-height", `${keyboard}px`);

      // iOS가 키보드 노출용으로 강제 스크롤한 문서를 맨 위로 되돌려
      // position:fixed 컨테이너 안의 caret 위치를 보정한다.
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };

    sync();

    if (vv) {
      vv.addEventListener("resize", sync);
      vv.addEventListener("scroll", sync);
    } else {
      window.addEventListener("resize", sync);
    }
    window.addEventListener("scroll", sync);
    // 키보드를 띄우는 포커스 순간에도 다시 측정한다.
    window.addEventListener("focusin", sync);

    return () => {
      if (vv) {
        vv.removeEventListener("resize", sync);
        vv.removeEventListener("scroll", sync);
      } else {
        window.removeEventListener("resize", sync);
      }
      window.removeEventListener("scroll", sync);
      window.removeEventListener("focusin", sync);
    };
  }, []);
}
