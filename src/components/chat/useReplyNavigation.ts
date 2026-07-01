import type { Chat } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type UseReplyNavigationParams = {
  chats: Chat[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<{ hasNextPage?: boolean }>;
  focusChat: (chatId: number) => boolean;
};

export function useReplyNavigation({
  chats,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  focusChat,
}: UseReplyNavigationParams) {
  const [pendingReplyToId, setPendingReplyToId] = useState<number | null>(null);

  const clearPendingReply = () => {
    requestAnimationFrame(() => {
      setPendingReplyToId(null);
    });
  };

  const handleReplyPreviewClick = useCallback(
    (replyToId: number) => {
      if (focusChat(replyToId)) return;

      setPendingReplyToId(replyToId);
    },
    [focusChat],
  );

  useEffect(() => {
    if (!pendingReplyToId) return;

    if (focusChat(pendingReplyToId)) {
      clearPendingReply();
      return;
    }

    if (isFetchingNextPage) return;

    if (!hasNextPage) {
      requestAnimationFrame(() => {
        setPendingReplyToId(null);
        toast.info("원본 메시지를 찾을 수 없어요.");
      });
      return;
    }

    fetchNextPage().catch(() => {
      requestAnimationFrame(() => {
        setPendingReplyToId(null);
        toast.error("원본 메시지를 불러오지 못했어요.");
      });
    });
  }, [pendingReplyToId, chats, hasNextPage, isFetchingNextPage, fetchNextPage, focusChat]);

  return {
    handleReplyPreviewClick,
  };
}
