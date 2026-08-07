import {
  sendChat as sendChatRequest,
  sendReadStatus as sendReadStatusRequest,
} from "@/api/chat";
import { useFetchChats } from "@/hooks/use-chat";
import { ROOM_KEYS, useFetchRoomById } from "@/hooks/use-room";
import { useChatSse } from "@/sse/useChatSse";
import type {
  ChatView,
  ChatCursor,
  ChatSseEvent,
  RoomListItem,
} from "@/types/types";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

export function useRoomPageHook({
  roomCode,
  onChatCreated,
}: {
  roomCode: string;
  onChatCreated: (chat: ChatView) => void;
}) {
  const queryClient = useQueryClient();

  const {
    data: room,
    isLoading: isRoomLoading,
    isError: isRoomError,
  } = useFetchRoomById(roomCode);

  const {
    data: chats = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchChats(roomCode);

  const latestChatId = chats.length > 0 ? chats[0].id : null;
  const lastReadChatIdRef = useRef<number | null>(null);
  const hasSseConnectedRef = useRef(false);

  const { isConnected: isChatSseConnected } = useChatSse(
    roomCode,
    (event: ChatSseEvent) => {
      if (event.type === "CREATED") {
        const newChat = event.chat;

        queryClient.setQueryData<InfiniteData<ChatCursor, number | undefined>>(
          ROOM_KEYS.chats(roomCode),
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
        onChatCreated(newChat);

        return;
      }

      if (event.type === "DELETED") {
        const deletedChat = event.chat;

        queryClient.setQueryData<InfiniteData<ChatCursor, number | undefined>>(
          ROOM_KEYS.chats(roomCode),
          (old) => {
            if (!old) return old;

            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                chats: page.chats.map((chat) => {
                  if (chat.id === deletedChat.id) {
                    return deletedChat;
                  }

                  if (chat.replyTo?.id === deletedChat.id) {
                    return {
                      ...chat,
                      replyTo: {
                        ...chat.replyTo,
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
    },
  );

  useEffect(() => {
    if (!isChatSseConnected) return;

    if (!hasSseConnectedRef.current) {
      hasSseConnectedRef.current = true;
      return;
    }

    void queryClient.invalidateQueries({ queryKey: ROOM_KEYS.chats(roomCode) });
  }, [isChatSseConnected, queryClient, roomCode]);

  useEffect(() => {
    if (!room?.isMyRoom || !latestChatId) return;
    if (lastReadChatIdRef.current === latestChatId) return;

    void sendReadStatusRequest({ roomCode, lastReadChatId: latestChatId })
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
      void sendChatRequest({ roomCode, content, replyToId }).catch(
        (error: Error) => {
          toast.error(error.message);
        },
      );
    },
    [roomCode],
  );

  return {
    room,
    chats,
    isRoomLoading,
    isRoomError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    sendMessage,
  };
}
