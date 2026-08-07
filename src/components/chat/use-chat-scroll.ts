import { useCallback, useRef } from "react";

export function useChatScroll() {
  const chatListRef = useRef<HTMLDivElement | null>(null);

  const scrollToLatestChat = useCallback(() => {
    chatListRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return {
    chatListRef,
    scrollToLatestChat,
  };
}
