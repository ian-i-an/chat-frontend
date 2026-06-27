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
 */
export function useViewportHeight() {
  useEffect(() => {
    const vv = window.visualViewport;

    const update = () => {
      const height = vv ? vv.height : window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${height}px`);
    };

    update();

    if (vv) {
      vv.addEventListener("resize", update);
      vv.addEventListener("scroll", update);
    } else {
      window.addEventListener("resize", update);
    }

    return () => {
      if (vv) {
        vv.removeEventListener("resize", update);
        vv.removeEventListener("scroll", update);
      } else {
        window.removeEventListener("resize", update);
      }
    };
  }, []);
}
