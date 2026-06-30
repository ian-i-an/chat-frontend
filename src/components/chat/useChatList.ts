import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import type { Chat } from "@/types/types";

type UseReplyNavigationParams = {
  chats: Chat[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<{ hasNextPage?: boolean }>;
};

export function useChatList({
  chats,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseReplyNavigationParams) {
  const { ref: topObserverRef, inView } = useInView();
  const [pendingReplyToId, setPendingReplyToId] = useState<number | null>(null);
  const [highlightChatId, setHighlightChatId] = useState<number | null>(null);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const scrollToChatElement = (chatId: number) => {
    const target = document.getElementById(`chat-${chatId}`);

    if (!target) return false;

    target.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    requestAnimationFrame(() => {
      setHighlightChatId(chatId);
      window.setTimeout(() => {
        setHighlightChatId((currentId) =>
          currentId === chatId ? null : currentId,
        );
      }, 1000);
    });

    return true;
  };

  const handleReplyPreviewClick = (replyToId: number) => {
    if (scrollToChatElement(replyToId)) return;

    setPendingReplyToId(replyToId);
  };

  useEffect(() => {
    if (!pendingReplyToId) return;

    if (scrollToChatElement(pendingReplyToId)) {
      requestAnimationFrame(() => {
        setPendingReplyToId(null);
      });
      return;
    }

    if (!hasNextPage && !isFetchingNextPage) {
      requestAnimationFrame(() => {
        setPendingReplyToId(null);
        toast.info("원본 메시지를 찾을 수 없어요.");
      });
      return;
    }

    if (!isFetchingNextPage) {
      fetchNextPage().catch(() => {
        requestAnimationFrame(() => {
          setPendingReplyToId(null);
          toast.error("원본 메시지를 불러오지 못했어요.");
        });
      });
    }
  }, [pendingReplyToId, chats, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    topObserverRef,
    highlightChatId,
    handleReplyPreviewClick,
  };
}
