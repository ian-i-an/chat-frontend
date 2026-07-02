import { useEffect, type RefObject } from "react";

export function useKeyboardInset(targetRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const vv = window.visualViewport;
    const root = document.documentElement;

    const reset = () => {
      root.style.setProperty("--keyboard-height", "0px");
    };

    const update = () => {
      const target = targetRef.current;

      if (!target || !vv) {
        reset();
        return;
      }

      const targetBottom = target.getBoundingClientRect().bottom;
      const visibleBottom = vv.offsetTop + vv.height;
      const hiddenAmount = targetBottom - visibleBottom;
      const keyboardInset = Math.max(0, hiddenAmount);

      root.style.setProperty("--keyboard-height", `${keyboardInset}px`);
    };

    const updateAfterLayout = () => {
      requestAnimationFrame(update);
    };

    vv?.addEventListener("resize", updateAfterLayout);
    vv?.addEventListener("scroll", updateAfterLayout);
    window.addEventListener("focusin", updateAfterLayout);
    window.addEventListener("focusout", reset);

    updateAfterLayout();

    return () => {
      vv?.removeEventListener("resize", updateAfterLayout);
      vv?.removeEventListener("scroll", updateAfterLayout);
      window.removeEventListener("focusin", updateAfterLayout);
      window.removeEventListener("focusout", reset);
      reset();
    };
  }, [targetRef]);
}
