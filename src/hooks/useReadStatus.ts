import { stompClient } from "@/api/websocket-client";
import { useWebSocketConnection } from "@/context/WebSocketContext";
import type { ChatRoomListItem } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { CHAT_ROOM_KEYS } from "./useChatRoom";

export const useReadStatus = (chatRoomId: number) => {
  const isConnected = useWebSocketConnection();
  const queryClient = useQueryClient();

  const sendReadStatus = async (latestChatId: number | null) => {
    if (!isConnected || !latestChatId) return;
    await queryClient.cancelQueries({ queryKey: CHAT_ROOM_KEYS.list });

    stompClient.publish({
      destination: `/pub/chat-rooms/${chatRoomId}/read`,
      body: JSON.stringify({ lastReadChatId: latestChatId }),
    });

    queryClient.setQueryData<ChatRoomListItem[]>(
      CHAT_ROOM_KEYS.list,
      (oldChatRooms) => {
        if (!oldChatRooms) return oldChatRooms;

        return oldChatRooms.map((room) =>
          room.id === chatRoomId ? { ...room, unreadCount: 0 } : room,
        );
      },
    );
  };

  return { sendReadStatus };
};
