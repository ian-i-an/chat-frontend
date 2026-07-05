import ChatInput from "@/components/chat/ChatInput";
import ChatList from "@/components/chat/ChatList";
import IconButton from "@/components/common/IconButton";
import { ChevronLeft, Copy, MessageCircle, X } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { useRoomPageHook } from "@/page-hooks/useRoomPageHook";
import { useEffect, useRef, useState } from "react";
import type { Chat } from "@/types/types";
import { useDeleteChat } from "@/hooks/use-chat";
import { toast } from "sonner";
import { useChatScroll } from "@/components/chat/use-chat-scroll";
import { useReplyNavigation } from "@/components/chat/use-reply-navigation";
import { useCloseReply, useReplyTo, useReset } from "@/store/room-ui-store";
import { useKeyboardInset } from "@/hooks/use-keyboard-inset";

export default function RoomPage() {
  const roomCode = useParams<{ roomCode: string }>().roomCode!;
  const replyTo = useReplyTo();
  const closeReply = useCloseReply();
  const reset = useReset();
  //
  const onChatCreatedRef = useRef<(chat: Chat) => void>(() => {});
  const inputBarRef = useRef<HTMLDivElement>(null);
  const [inputBarHeight, setInputBarHeight] = useState(0);
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

  useEffect(() => {
    const inputBar = inputBarRef.current;
    if (!inputBar) return;

    const updateInputBarHeight = () => {
      setInputBarHeight(Math.ceil(inputBar.getBoundingClientRect().height));
    };

    updateInputBarHeight();

    const observer = new ResizeObserver(updateInputBarHeight);
    observer.observe(inputBar);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (isRoomLoading) {
    return <Loader fullPage />;
  }

  if (isRoomError || !room) return <Navigate to="/rooms" replace />;

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-gray-50/70">
      <header className="absolute top-1.5 right-2.5 left-2.5 z-20 flex h-13 items-center gap-2 rounded-2xl border border-white/60 bg-white/50 px-1.5 shadow-lg ring-1 shadow-gray-200/50 ring-gray-950/5 backdrop-blur-xl">
        <IconButton onClick={() => navigate("/rooms")}>
          <ChevronLeft className="h-6 w-6" />
        </IconButton>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-500">
          <MessageCircle className="h-4.5 w-4.5" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-extrabold text-gray-950">
            {room?.name}
          </h2>
          <p className="truncate text-xs font-medium text-gray-400">
            개인 채팅방
          </p>
        </div>

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
        bottomInset={inputBarHeight + 16}
      />

      <div
        ref={inputBarRef}
        className="absolute right-2.5 bottom-3 left-2.5 z-20 mb-(--keyboard-height,0px)"
      >
        {replyTo && (
          <div className="mb-2 flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/60 py-2 shadow-lg shadow-gray-200/50 ring-1 ring-gray-950/5 backdrop-blur-xl">
            <div className="flex min-w-0 flex-col gap-1 pr-2 pl-4">
              <div className="text-[11px] font-bold text-blue-500">
                {replyTo.isOwner ? "방장 메시지에 답장" : "익명 메시지에 답장"}
              </div>
              <div className="line-clamp-2 text-xs font-medium break-all text-gray-500">
                {replyTo.content}
              </div>
            </div>
            <IconButton onClick={closeReply}>
              <X className="h-4 w-4" />
            </IconButton>
          </div>
        )}
        <ChatInput onSendMessage={handleSendMessage} variant="glass" />
      </div>
    </div>
  );
}
