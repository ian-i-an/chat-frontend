import { stompClient } from "@/websocket/websocket-client";
import { useWebSocketConnection } from "@/websocket/WebSocketContext";
import type { RoomListItem } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { ROOM_KEYS } from "../hooks/useRoom";

export const useReadStatus = (roomCode: string) => {
  const isConnected = useWebSocketConnection();
  const queryClient = useQueryClient();

  const sendReadStatus = async (latestChatId: number | null) => {
    if (!isConnected || !latestChatId) return;
    await queryClient.cancelQueries({ queryKey: ROOM_KEYS.list });

    stompClient.publish({
      destination: `/pub/rooms/${roomCode}/read`,
      body: JSON.stringify({ lastReadChatId: latestChatId }),
    });

    queryClient.setQueryData<RoomListItem[]>(ROOM_KEYS.list, (oldChatRooms) => {
      if (!oldChatRooms) return oldChatRooms;

      return oldChatRooms.map((room) =>
        room.roomCode === roomCode ? { ...room, unreadCount: 0 } : room,
      );
    });
  };

  return { sendReadStatus };
};
