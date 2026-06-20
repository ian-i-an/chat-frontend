import ChatInput from "@/components/chat/ChatInput";
import ChatList from "@/components/chat/ChatList";
import Loader from "@/components/Loader";
import { useFetchChats } from "@/hooks/useChat";
import { CHAT_ROOM_KEYS, useFetchChatRoomById } from "@/hooks/useChatRoom";
import { useChatWebSocket } from "@/hooks/useChatWebSocket";
import { useReadStatus } from "@/hooks/useReadStatus";
import type { Chat, ChatCursor } from "@/types";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

export default function ChatRoomPage() {
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const numericId = Number(chatRoomId);
  const { data: chatRoom } = useFetchChatRoomById(numericId);
  const isSignedIn = localStorage.getItem("isSignedIn");
  const { sendReadStatus } = useReadStatus(numericId);
  const queryClient = useQueryClient();

  const {
    data: chats = [],
    isLoading: isFetchChatsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchChats(numericId);

  const latestChatId = chats.length > 0 ? chats[0].id : null;

  const { sendMessage } = useChatWebSocket(numericId, (newChat: Chat) => {
    if (chatRoom?.isMyChatRoom && isSignedIn) {
      sendReadStatus(newChat.id);
    }
    queryClient.setQueryData<InfiniteData<ChatCursor, number | undefined>>(
      CHAT_ROOM_KEYS.chats(numericId),
      (old) => {
        if (!old || old.pages.length === 0) return old;

        return {
          ...old,
          pages: [
            {
              ...old.pages[0],
              chats: [newChat, ...old.pages[0].chats],
            },
            ...old.pages.slice(1),
          ],
        };
      },
    );
  });

  useEffect(() => {
    return () => {
      if (chatRoom?.isMyChatRoom && latestChatId && isSignedIn) {
        sendReadStatus(latestChatId);
      }
    };
  }, [latestChatId, chatRoom?.isMyChatRoom, sendReadStatus, isSignedIn]);

  if (!numericId) return <Navigate to="/chat-rooms" replace />;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="z-10 flex h-14 shrink-0 items-center gap-3 border-b border-gray-100 px-4">
        <Link
          to="/chat-rooms"
          className="-ml-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h2 className="truncate text-base font-bold text-gray-900">
          {chatRoom?.name}
        </h2>
      </header>

      {isFetchChatsLoading ? (
        <div className="flex h-full items-center justify-center ">
          <Loader />
        </div>
      ) : (
        <ChatList
          amIOwner={chatRoom?.isMyChatRoom ?? false}
          chats={chats}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}
