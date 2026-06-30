import ChatInput from "@/components/chat/ChatInput";
import ChatList from "@/components/chat/ChatList";
import { ChevronLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { useKeyboardInset } from "@/hooks/useKeyboardInset";
import { useRoom } from "@/page-hooks/useRoom";
import { useState } from "react";
import type { Chat } from "@/types/types";

export default function Room() {
  const roomCode = useParams<{ roomCode: string }>().roomCode!;
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [replyTo, setReplyTo] = useState<Chat | null>(null);

  useKeyboardInset();

  const {
    room,
    chats,
    isRoomLoading,
    isRoomError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    sendMessage,
  } = useRoom(roomCode);

  const handleToggleChatMenu = (chatId: number) => {
    setActiveChatId((currentId) => (currentId === chatId ? null : chatId));
  };

  const handleStartReply = (chat: Chat) => {
    setReplyTo(chat);
    setActiveChatId(null);
  };

  const handleDeleteChat = (chat: Chat) => {
    setActiveChatId(null);
    console.log("delete chat", chat.id);
  };

  const handleSendMessage = (content: string) => {
    sendMessage(content);
    setReplyTo(null);
  };

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
        activeChatId={activeChatId}
        canDelete={room.isMyRoom}
        onToggleChatMenu={handleToggleChatMenu}
        onStartReply={handleStartReply}
        onDeleteChat={handleDeleteChat}
      />

      <ChatInput
        replyTo={replyTo}
        setReplyTo={setReplyTo}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
