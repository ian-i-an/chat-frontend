import React, { type RefObject } from "react";
import ChatItem from "./ChatItem";
import type { Chat } from "@/types/types";
import { formatDate, isSameDay } from "@/utils/time";
import Loader from "../common/Loader";
import { useChatNext } from "./useChatNext";
import { useCloseActiveMenu } from "@/store/room-ui-store";

interface ChatListProps {
  chats: Chat[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<{ hasNextPage?: boolean }>;
  amIOwner: boolean;
  canDelete: boolean;
  onDeleteChat: (chat: Chat) => void;
  chatListRef: RefObject<HTMLDivElement | null>;
  highlightChatId: number | null;
  onReplyPreviewClick: (replyToId: number) => void;
}

export default function ChatList({
  chats,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  amIOwner,
  canDelete,
  onDeleteChat,
  chatListRef,
  highlightChatId,
  onReplyPreviewClick,
}: ChatListProps) {
  const { topObserverRef } = useChatNext({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const closeActiveMenu = useCloseActiveMenu();

  return (
    <div
      ref={chatListRef}
      onClick={closeActiveMenu}
      onScroll={closeActiveMenu}
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
              isHighlighted={chat.id === highlightChatId}
              canDelete={canDelete}
              onDeleteChat={() => onDeleteChat(chat)}
              onReplyPreviewClick={() => {
                if (chat.replyTo) {
                  onReplyPreviewClick(chat.replyTo.id);
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
