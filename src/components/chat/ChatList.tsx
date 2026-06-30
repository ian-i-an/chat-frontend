import React, { useEffect } from "react";
import ChatItem from "./ChatItem";
import type { Chat } from "@/types/types";
import { useInView } from "react-intersection-observer";
import { formatDate, isSameDay } from "@/utils/time";
import Loader from "../common/Loader";

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
}: {
  chats: Chat[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  amIOwner: boolean;
  activeChatId: number | null;
  canDelete: boolean;
  onToggleChatMenu: (chatId: number) => void;
  onStartReply: (chat: Chat) => void;
  onDeleteChat: (chat: Chat) => void;
}) {
  const { ref: topObserverRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-1 flex-col-reverse gap-4 overflow-y-auto bg-gray-50 px-4 py-6">
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
              canDelete={canDelete}
              onToggleMenu={() => onToggleChatMenu(chat.id)}
              onStartReply={() => onStartReply(chat)}
              onDeleteChat={() => onDeleteChat(chat)}
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
