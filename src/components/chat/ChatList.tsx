import React, { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import type { Chat } from "@/types/types";
import { useInView } from "react-intersection-observer";
import { formatDate, isSameDay } from "@/utils/time";
import Loader from "../common/Loader";
import { toast } from "sonner";

export default function ChatList({
  chats,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  amIOwner,
  activeChatId,
  canDelete,
  onToggleChatMenu,
  onStartReply,
  onDeleteChat,
  onCloseChatMenu,
}: {
  chats: Chat[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<{ hasNextPage?: boolean }>;
  amIOwner: boolean;
  activeChatId: number | null;
  canDelete: boolean;
  onToggleChatMenu: (chatId: number) => void;
  onStartReply: (chat: Chat) => void;
  onDeleteChat: (chat: Chat) => void;
  onCloseChatMenu: () => void;
}) {
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

  return (
    <div
      onClick={onCloseChatMenu}
      onScroll={onCloseChatMenu}
      className="flex flex-1 flex-col-reverse gap-4 overflow-y-auto bg-gray-50 px-4 py-6"
    >
      {chats.map((chat, index) => {
        const isLastElement = index === chats.length - 1;

        const showDateDivider =
          isLastElement ||
          !isSameDay(chat.createdAt, chats[index + 1].createdAt);

        return (
          <React.Fragment key={chat.id}>
            <ChatItem
              amIOwner={amIOwner}
              chat={chat}
              isMenuOpen={chat.id === activeChatId}
              isHighlighted={chat.id === highlightChatId}
              canDelete={canDelete}
              onToggleMenu={() => onToggleChatMenu(chat.id)}
              onStartReply={() => onStartReply(chat)}
              onDeleteChat={() => onDeleteChat(chat)}
              onReplyPreviewClick={() => {
                if (chat.replyTo) {
                  void handleReplyPreviewClick(chat.replyTo.id);
                }
              }}
            />
            {showDateDivider && (
              <div className="my-1 flex items-center">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="mx-3 rounded-full px-2 py-0.5 text-[10px] font-semibold text-gray-400">
                  {formatDate(chat.createdAt)}
                </span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
      {!isFetchingNextPage && hasNextPage && (
        <div ref={topObserverRef} className="h-1 w-full shrink-0"></div>
      )}
      {isFetchingNextPage && <Loader />}
    </div>
  );
}
