import ChatInput from "@/components/chat/ChatInput";

import IconButton from "@/components/common/IconButton";
import { ChevronLeft, Copy, X } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { useEffect, useRef } from "react";
import type { ChatCursorResponse, ChatSseEvent } from "@/domain/chat.type";
import {
  useDeleteChat,
  useGetChats,
  useReadChat,
  useSendChat,
} from "@/queries/chat.queries";
import { toast } from "sonner";
import { useChatScroll } from "@/components/chat/use-chat-scroll";
import {
  useCloseActiveMenu,
  useCloseReply,
  useReplyTo,
  useReset,
} from "@/store/room-ui-store";
import { useKeyboardInset } from "@/hooks/use-keyboard-inset";
import { useElementSize } from "@/hooks/use-element-size";
import { ROOM_KEYS, useGetRoom } from "@/queries/room.queries";
import { useChatSse } from "@/sse/useChatSse";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { formatDate, isSameDay } from "@/utils/time";
import React from "react";
import ChatItem from "@/components/chat/ChatItem";
import { useChatNext } from "@/components/chat/use-chat-next";

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
  const { mutate: sendChat } = useSendChat(roomCode);
  const { mutate: readChat } = useReadChat(roomCode);
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

  const { topObserverRef } = useChatNext({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const latestChatId = chats.length > 0 ? chats[0].id : null;
  const { chatListRef, scrollToLatestChat } = useChatScroll();
  const closeActiveMenu = useCloseActiveMenu();

  const { isConnected } = useChatSse(roomCode, (event: ChatSseEvent) => {
    if (event.type === "CREATED") {
      const newChat = event.chatView;

      queryClient.setQueryData<
        InfiniteData<ChatCursorResponse, number | undefined>
      >(ROOM_KEYS.chats(roomCode), (old) => {
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
      });

      requestAnimationFrame(() => {
        scrollToLatestChat();
      });

      return;
    }

    if (event.type === "DELETED") {
      const deletedChat = event.chatView;

      queryClient.setQueryData<
        InfiniteData<ChatCursorResponse, number | undefined>
      >(ROOM_KEYS.chats(roomCode), (old) => {
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
      });
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

    readChat(
      { lastReadChatId: latestChatId },
      {
        onSuccess: () => {
          lastReadChatIdRef.current = latestChatId;
        },
      },
    );
  }, [latestChatId, queryClient, room?.isMyRoom, roomCode, readChat]);

  const handleSendMessage = (content: string) => {
    sendChat({ content, replyToId: replyTo?.id ?? null });
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
    <div className="bg-background/70 relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <header className="glass absolute top-1.5 right-2.5 left-2.5 z-20 flex h-13 items-center gap-2 rounded-2xl px-1.5">
        <IconButton
          onClick={() => navigate("/rooms")}
          className="text-subtle-foreground hover:glass-hover"
        >
          <ChevronLeft className="h-6 w-6" />
        </IconButton>

        <div className="min-w-0 flex-1">
          <h2 className="text-foreground truncate text-base font-extrabold">
            {room.name}
          </h2>
          <p className="text-subtle-foreground truncate text-xs font-medium">
            개인 채팅방
          </p>
        </div>

        <IconButton
          onClick={handleCopyRoomLink}
          className="text-subtle-foreground hover:glass-hover"
        >
          <Copy className="h-4.5 w-4.5" />
        </IconButton>
      </header>

      {/* chatlist */}
      <div
        ref={chatListRef}
        onClick={closeActiveMenu}
        onScroll={closeActiveMenu}
        className="flex min-h-0 flex-1 flex-col-reverse gap-4 overflow-y-auto px-4 pt-18 pb-5"
        style={
          inputBarHeight + 24
            ? { paddingBottom: `${inputBarHeight + 24}px` }
            : undefined
        }
      >
        {chats.map((chat, index) => {
          const isLastElement = index === chats.length - 1;

          const showDateDivider =
            isLastElement ||
            !isSameDay(chat.createdAt, chats[index + 1].createdAt);

          return (
            <React.Fragment key={chat.id}>
              <ChatItem
                amIOwner={room?.isMyRoom ?? false}
                chat={chat}
                canDelete={room.isMyRoom}
                onDeleteChat={() => {
                  deleteChat(chat.id);
                }}
              />
              {showDateDivider && (
                <div className="my-1 flex items-center">
                  <div className="border-border flex-1 border-t"></div>
                  <span className="text-subtle-foreground mx-3 rounded-full px-2 py-0.5 text-[10px] font-semibold">
                    {formatDate(chat.createdAt)}
                  </span>
                  <div className="border-border flex-1 border-t"></div>
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

      <div
        ref={inputBarRef}
        className="absolute right-2.5 bottom-3 left-2.5 z-20 mb-(--keyboard-height,0px)"
      >
        {replyTo && (
          <div className="bg-surface/60 glass mb-2 flex items-center justify-between gap-3 rounded-2xl py-2">
            <div className="flex min-w-0 flex-col gap-1 pr-2 pl-4">
              <div className="text-primary text-[11px] font-bold">
                {replyTo.isOwner ? "방장 메시지에 답장" : "익명 메시지에 답장"}
              </div>
              <div className="text-muted-foreground line-clamp-2 text-xs font-medium break-all">
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
