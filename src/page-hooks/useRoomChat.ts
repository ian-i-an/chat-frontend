import { useFetchChats } from "@/hooks/useChat";
import { ROOM_KEYS, useFetchRoomById } from "@/hooks/useRoom";
import { useReadStatus } from "@/websocket/useReadStatus";
import { useChatWebSocket } from "@/websocket/useChatWebSocket";
import type { Chat, ChatCursor } from "@/types/types";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { useEffect } from "react";

export function useRoomChat(roomCode: string) {
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

  const { sendMessage } = useChatWebSocket(roomCode, (newChat: Chat) => {
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
  });

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
