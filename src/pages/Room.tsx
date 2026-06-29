import ChatInput from "@/components/chat/ChatInput";
import ChatList from "@/components/chat/ChatList";
import { ChevronLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { useKeyboardInset } from "@/hooks/useKeyboardInset";
import { useRoom } from "@/page-hooks/useRoom";

export default function Room() {
  const roomCode = useParams<{ roomCode: string }>().roomCode!;

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
