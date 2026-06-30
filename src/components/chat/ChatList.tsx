import React from "react";
import ChatItem from "./ChatItem";
import type { Chat } from "@/types/types";
import { formatDate, isSameDay } from "@/utils/time";
import Loader from "../common/Loader";
import { useChatList } from "./useChatList";
import NewChatNotice from "./NewChatNotice";

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
  const {
    listRef,
    topObserverRef,
    highlightChatId,
    showNewChatNotice,
    handleListScroll,
    handleReplyPreviewClick,
    scrollToLatestChat,
  } = useChatList({
    chats,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <div className="relative flex flex-1 overflow-hidden bg-gray-50">
      <div
        ref={listRef}
        onClick={onCloseChatMenu}
        onScroll={() => {
          onCloseChatMenu();
          handleListScroll();
        }}
        className="flex flex-1 flex-col-reverse gap-4 overflow-y-auto px-4 py-6"
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

      {showNewChatNotice && <NewChatNotice onClick={scrollToLatestChat} />}
    </div>
  );
}
