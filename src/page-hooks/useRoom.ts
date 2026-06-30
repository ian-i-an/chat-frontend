import { useFetchChats } from "@/hooks/useChat";
import { ROOM_KEYS, useFetchRoomById } from "@/hooks/useRoom";
import { useReadStatus } from "@/websocket/useReadStatus";
import { useChatWebSocket } from "@/websocket/useChatWebSocket";
import type { ChatCursor, ChatEventPayload } from "@/types/types";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { useEffect } from "react";

export function useRoom(roomCode: string) {
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

  const { sendReadStatus } = useReadStatus(roomCode);
  const latestChatId = chats.length > 0 ? chats[0].id : null;

  const { sendMessage } = useChatWebSocket(
    roomCode,
    (event: ChatEventPayload) => {
      if (event.type === "CREATED") {
        const newChat = event.chat;
        if (room?.isMyRoom) {
          sendReadStatus(newChat.id);
        }

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
    return () => {
      if (room?.isMyRoom && latestChatId) {
        sendReadStatus(latestChatId);
      }
    };
  }, [latestChatId, room?.isMyRoom, sendReadStatus]);

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
