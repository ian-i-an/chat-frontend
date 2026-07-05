import { useEffect, useRef, useState } from "react";

export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      const nextSize = {
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height),
      };

      setSize((prevSize) => {
        if (
          prevSize.width === nextSize.width &&
          prevSize.height === nextSize.height
        ) {
          return prevSize;
        }

        return nextSize;
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, ...size };
}
