import { useEffect } from "react";

export function useKeyboardInset() {
  useEffect(() => {
    const visualViewport = window.visualViewport;
    const root = document.documentElement;
    const isInAppBrowser = /Twitter/i.test(window.navigator.userAgent);

    const reset = () => {
      root.style.setProperty("--keyboard-height", "0px");
    };

    const update = () => {
      if (!isInAppBrowser) {
        reset();
        return;
      }

      const keyboardHeight = visualViewport
        ? Math.max(0, window.innerHeight - visualViewport.height)
        : 0;
      root.style.setProperty("--keyboard-height", `${keyboardHeight}px`);
    };

    update();

    visualViewport?.addEventListener("resize", update);

    return () => {
      visualViewport?.removeEventListener("resize", update);
      reset();
    };
  }, []);
}
