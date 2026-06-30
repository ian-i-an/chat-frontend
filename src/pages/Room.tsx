import ChatInput from "@/components/chat/ChatInput";
import ChatList from "@/components/chat/ChatList";
import IconButton from "@/components/common/IconButton";
import { ChevronLeft, Copy } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { useKeyboardInset } from "@/hooks/useKeyboardInset";
import { useRoom } from "@/page-hooks/useRoom";
import { useState } from "react";
import type { Chat } from "@/types/types";
import { useDeleteChat } from "@/hooks/useChat";
import { toast } from "sonner";

export default function Room() {
  const roomCode = useParams<{ roomCode: string }>().roomCode!;
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [replyTo, setReplyTo] = useState<Chat | null>(null);
  const navigate = useNavigate();

  const { mutate: deleteChat } = useDeleteChat(roomCode);

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

  const handleGoToRoomList = () => {
    navigate("/rooms");
  };

  const handleToggleChatMenu = (chatId: number) => {
    setActiveChatId((currentId) => (currentId === chatId ? null : chatId));
  };

  const handleCloseChatMenu = () => {
    setActiveChatId(null);
  };

  const handleStartReply = (chat: Chat) => {
    setReplyTo(chat);
    setActiveChatId(null);
  };

  const handleDeleteChat = (chat: Chat) => {
    setActiveChatId(null);
    deleteChat(chat.id);
  };

  const handleSendMessage = (content: string) => {
    sendMessage(content, replyTo?.id);
    setReplyTo(null);
  };

  const handleCopyRoomLink = async () => {
    const roomLink = `${window.location.host}/${roomCode}`;

    try {
      await navigator.clipboard.writeText(roomLink);
      toast.success("채팅방 링크를 복사했어요.");
    } catch {
      toast.error("링크를 복사하지 못했어요.");
    }
  };

  if (isRoomLoading) {
    return <Loader fullPage />;
  }

  if (isRoomError || !room) return <Navigate to="/rooms" replace />;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="z-10 flex h-13 shrink-0 items-center gap-3 border-b border-gray-100 px-4">
        <IconButton onClick={handleGoToRoomList}>
          <ChevronLeft className="h-6 w-6" />
        </IconButton>
        <h2 className="flex-1 truncate text-base font-bold text-gray-900">
          {room?.name}
        </h2>
        <IconButton onClick={handleCopyRoomLink}>
          <Copy className="h-4.5 w-4.5" />
        </IconButton>
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
        onCloseChatMenu={handleCloseChatMenu}
      />

      <ChatInput
        replyTo={replyTo}
        setReplyTo={setReplyTo}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
