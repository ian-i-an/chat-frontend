import ChatInput from "@/components/chat/ChatInput";

import ChatList from "@/components/chat/ChatList";
import IconButton from "@/components/common/IconButton";
import { ChevronLeft, Copy, X } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { useCallback, useEffect, useRef } from "react";
import type {
  ChatCursorResponse,
  ChatSseEvent,
  ChatView,
} from "@/backend/chat/chat.type";
import { useDeleteChat, useGetChats } from "@/backend/chat/chat.queries";
import { toast } from "sonner";
import { useChatScroll } from "@/components/chat/use-chat-scroll";
import { useCloseReply, useReplyTo, useReset } from "@/store/room-ui-store";
import { useKeyboardInset } from "@/hooks/use-keyboard-inset";
import { useElementSize } from "@/hooks/use-element-size";
import {
  sendChat as sendChatRequest,
  readChat as readChatRequest,
} from "@/backend/chat/chat.api";
import { ROOM_KEYS, useGetRoom } from "@/backend/room/room.queries";
import { useChatSse } from "@/sse/useChatSse";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { RoomListItem } from "@/backend/room/room.type";

export default function RoomPage() {
  const roomCode = useParams<{ roomCode: string }>().roomCode!;
  const replyTo = useReplyTo();
  const closeReply = useCloseReply();
  const reset = useReset();
  const { ref: inputBarRef, height: inputBarHeight } =
    useElementSize<HTMLDivElement>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteChat } = useDeleteChat(roomCode);
  const lastReadChatIdRef = useRef<number | null>(null);
  const hasSseConnectedRef = useRef(false);
  useKeyboardInset();

  const {
    data: room,
    isLoading: isRoomLoading,
    isError: isRoomError,
  } = useGetRoom(roomCode);

  const {
    data: chats = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetChats(roomCode);

  const latestChatId = chats.length > 0 ? chats[0].id : null;
  const { chatListRef, scrollToLatestChat } = useChatScroll();

  const { isConnected } = useChatSse(roomCode, (event: ChatSseEvent) => {
    if (event.type === "CREATED") {
      const newChat = event.chatView;

      queryClient.setQueryData<
        InfiniteData<ChatCursorResponse, number | undefined>
      >(
        ROOM_KEYS.chats(roomCode),
        (old) => {
          if (!old || old.pages.length === 0) return old;

          return {
            ...old,
            pages: [
              {
                ...old.pages[0],
                chatViews: [newChat, ...old.pages[0].chatViews],
              },
              ...old.pages.slice(1),
            ],
          };
        },
      );

      requestAnimationFrame(() => {
        scrollToLatestChat();
      });

      return;
    }

    if (event.type === "DELETED") {
      const deletedChat = event.chatView;

      queryClient.setQueryData<
        InfiniteData<ChatCursorResponse, number | undefined>
      >(
        ROOM_KEYS.chats(roomCode),
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              chatViews: page.chatViews.map((chat) => {
                if (chat.id === deletedChat.id) {
                  return deletedChat;
                }

                if (chat.replyView?.id === deletedChat.id) {
                  return {
                    ...chat,
                    replyView: {
                      ...chat.replyView,
                      content: deletedChat.content,
                    },
                  };
                }

                return chat;
              }),
            })),
          };
        },
      );
    }
  });

  // sse 연결이 한 번이라도 된 상태에서 연결 상태에 변화가 생겼을 때, 룸 정보를 다시 가져옴.
  useEffect(() => {
    if (!isConnected) return;

    if (!hasSseConnectedRef.current) {
      hasSseConnectedRef.current = true;
      return;
    }

    void queryClient.invalidateQueries({ queryKey: ROOM_KEYS.chats(roomCode) });
  }, [isConnected, queryClient, roomCode]);

  useEffect(() => {
    if (!room?.isMyRoom || !latestChatId) return;
    if (lastReadChatIdRef.current === latestChatId) return;

    void readChatRequest({ roomCode, lastReadChatId: latestChatId })
      .then(() => {
        lastReadChatIdRef.current = latestChatId;

        queryClient.setQueryData<RoomListItem[]>(
          ROOM_KEYS.list,
          (oldChatRooms) => {
            if (!oldChatRooms) return oldChatRooms;

            return oldChatRooms.map((room) =>
              room.roomCode === roomCode ? { ...room, unreadCount: 0 } : room,
            );
          },
        );
      })
      .catch(() => undefined);
  }, [latestChatId, queryClient, room?.isMyRoom, roomCode]);

  const sendMessage = useCallback(
    (content: string, replyToId?: number) => {
      void sendChatRequest({
        roomCode,
        content,
        replyToId: replyToId ?? null,
      }).catch(
        (error: Error) => {
          toast.error(error.message);
        },
      );
    },
    [roomCode],
  );

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
    <div className="app-layout relative bg-background/70">
      <header className="glass absolute top-1.5 right-2.5 left-2.5 z-20 flex h-13 items-center gap-2 rounded-2xl px-1.5">
        <IconButton
          onClick={() => navigate("/rooms")}
          variant="ghost"
          className="glass-hover"
        >
          <ChevronLeft className="h-6 w-6" />
        </IconButton>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-extrabold text-foreground">
            {room.name}
          </h2>
          <p className="truncate text-xs font-medium text-subtle-foreground">
            개인 채팅방
          </p>
        </div>

        <IconButton onClick={handleCopyRoomLink} variant="ghost">
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
        onDeleteChat={(chat: ChatView) => {
          deleteChat(chat.id);
        }}
        bottomInset={inputBarHeight + 24}
      />

      <div
        ref={inputBarRef}
        className="absolute right-2.5 bottom-3 left-2.5 z-20 mb-(--keyboard-height,0px)"
      >
        {replyTo && (
          <div className="mb-2 flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-surface/60 py-2 shadow-lg ring-1 shadow-gray-200/50 ring-gray-950/5 backdrop-blur-xl">
            <div className="flex min-w-0 flex-col gap-1 pr-2 pl-4">
              <div className="text-[11px] font-bold text-primary">
                {replyTo.isOwner ? "방장 메시지에 답장" : "익명 메시지에 답장"}
              </div>
              <div className="line-clamp-2 text-xs font-medium break-all text-muted-foreground">
                {replyTo.content}
              </div>
            </div>
            <IconButton onClick={closeReply}>
              <X className="h-4 w-4" />
            </IconButton>
          </div>
        )}
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
