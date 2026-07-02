import { useCallback, useRef, useState } from "react";

const HIGHLIGHT_DURATION = 3000;

export function useChatScroll() {
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const [highlightChatId, setHighlightChatId] = useState<number | null>(null);

  const scrollToLatestChat = useCallback(() => {
    chatListRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const focusChat = useCallback((chatId: number) => {
    const target = document.getElementById(`chat-${chatId}`);

    if (!target) return false;

    target.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setHighlightChatId(chatId);
    window.setTimeout(() => {
      setHighlightChatId((currentId) =>
        currentId === chatId ? null : currentId,
      );
    }, HIGHLIGHT_DURATION);

    return true;
  }, []);

  return {
    chatListRef,
    highlightChatId,
    scrollToLatestChat,
    focusChat,
  };
}
