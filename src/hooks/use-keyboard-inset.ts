import { useEffect } from "react";

export function useKeyboardInset() {
  useEffect(() => {
    const vv = window.visualViewport;
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

      const keyboard = vv ? Math.max(0, window.innerHeight - vv.height) : 0;
      root.style.setProperty("--keyboard-height", `${keyboard}px`);
    };

    update();

    if (vv) {
      vv.addEventListener("resize", update);
    }

    return () => {
      if (vv) {
        vv.removeEventListener("resize", update);
      }
      reset();
    };
  }, []);
}
