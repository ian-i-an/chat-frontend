import ChatInput from "@/components/chat/ChatInput";
import ChatList from "@/components/chat/ChatList";
import IconButton from "@/components/common/IconButton";
import { ChevronLeft, Copy } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { useKeyboardInset } from "@/hooks/use-keyboard-inset";
import { useRoomPageHook } from "@/page-hooks/useRoomPageHook";
import { useEffect, useRef } from "react";
import type { Chat } from "@/types/types";
import { useDeleteChat } from "@/hooks/use-chat";
import { toast } from "sonner";
import { useChatScroll } from "@/components/chat/use-chat-scroll";
import { useReplyNavigation } from "@/components/chat/use-reply-navigation";
import { useCloseReply, useReplyTo, useReset } from "@/store/room-ui-store";

export default function RoomPage() {
  const roomCode = useParams<{ roomCode: string }>().roomCode!;
  const replyTo = useReplyTo();
  const closeReply = useCloseReply();
  const reset = useReset();
  //
  const onChatCreatedRef = useRef<(chat: Chat) => void>(() => {});
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
  } = useRoomPageHook({
    roomCode,
    onChatCreated: (chat) => {
      onChatCreatedRef.current(chat);
    },
  });

  const { chatListRef, highlightChatId, scrollToLatestChat, focusChat } =
    useChatScroll();

  const { handleReplyPreviewClick } = useReplyNavigation({
    chats,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    focusChat,
  });

  useEffect(() => {
    onChatCreatedRef.current = () => {
      requestAnimationFrame(() => {
        scrollToLatestChat();
      });
    };
  }, [scrollToLatestChat]);

  const handleDeleteChat = (chat: Chat) => {
    deleteChat(chat.id);
  };

  const handleSendMessage = (content: string) => {
    sendMessage(content, replyTo?.id);
    closeReply();
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
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  if (isRoomLoading) {
    return <Loader fullPage />;
  }

  if (isRoomError || !room) return <Navigate to="/rooms" replace />;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="z-10 flex h-13 shrink-0 items-center gap-3 border-b border-gray-100 px-4">
        <IconButton onClick={() => navigate("/rooms")}>
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
        chatListRef={chatListRef}
        amIOwner={room?.isMyRoom ?? false}
        chats={chats}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        canDelete={room.isMyRoom}
        onDeleteChat={handleDeleteChat}
        highlightChatId={highlightChatId}
        onReplyPreviewClick={handleReplyPreviewClick}
      />

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
