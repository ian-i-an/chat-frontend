import ChatInput from "@/components/chat/ChatInput";
import ChatList from "@/components/chat/ChatList";
import { useFetchChats } from "@/hooks/useChat";
import { ROOM_KEYS, useFetchRoomById } from "@/hooks/useRoom";
import { useChatWebSocket } from "@/websocket/useChatWebSocket";
import { useReadStatus } from "@/websocket/useReadStatus";
import type { Chat, ChatCursor } from "@/types/types";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { useKeyboardInset } from "@/hooks/useKeyboardInset";

export default function Room() {
  const roomCode = useParams<{ roomCode: string }>().roomCode!;

  useKeyboardInset();

  const {
    data: room,
    isLoading: isRoomLoading,
    isError: isRoomError,
  } = useFetchRoomById(roomCode);
  const { sendReadStatus } = useReadStatus(roomCode);
  const queryClient = useQueryClient();

  const {
    data: chats = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchChats(roomCode);

  const latestChatId = chats.length > 0 ? chats[0].id : null;

  const { sendMessage } = useChatWebSocket(roomCode!, (newChat: Chat) => {
    if (room?.isMyRoom) {
      sendReadStatus(newChat.id);
    }
    queryClient.setQueryData<InfiniteData<ChatCursor, number | undefined>>(
      ROOM_KEYS.chats(roomCode!),
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
      if (room?.isMyRoom && latestChatId) {
        sendReadStatus(latestChatId);
      }
    };
  }, [latestChatId, room?.isMyRoom, sendReadStatus]);

  if (isRoomLoading) {
    return <Loader fullPage />;
  }

  if (isRoomError || !room) return <Navigate to="/rooms" replace />;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="z-10 flex h-14 shrink-0 items-center gap-3 border-b border-gray-100 px-4">
        <Link
          to="/rooms"
          className="-ml-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h2 className="truncate text-base font-bold text-gray-900">
          {room?.name}
        </h2>
      </header>

      <ChatList
        amIOwner={room?.isMyRoom ?? false}
        chats={chats}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />

      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}
