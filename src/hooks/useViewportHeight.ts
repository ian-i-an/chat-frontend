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

    const update = () => {
      const height = vv ? vv.height : window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${height}px`);
    };

    // iOS가 강제로 스크롤시킨 문서를 맨 위로 되돌려 caret 위치를 보정.
    const pinScroll = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };

    update();
    pinScroll();

    if (vv) {
      vv.addEventListener("resize", update);
      vv.addEventListener("scroll", update);
    } else {
      window.addEventListener("resize", update);
    }
    window.addEventListener("scroll", pinScroll);

    return () => {
      if (vv) {
        vv.removeEventListener("resize", update);
        vv.removeEventListener("scroll", update);
      } else {
        window.removeEventListener("resize", update);
      }
      window.removeEventListener("scroll", pinScroll);
    };
  }, []);
}
