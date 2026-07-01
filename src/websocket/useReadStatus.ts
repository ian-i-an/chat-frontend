import { stompClient } from "@/websocket/websocket-client";
import { useWebSocketConnection } from "@/websocket/WebSocketContext";
import type { RoomListItem } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { ROOM_KEYS } from "../hooks/useRoom";
import { useCallback } from "react";

export const useReadStatus = (roomCode: string) => {
  const isConnected = useWebSocketConnection();
  const queryClient = useQueryClient();

  const sendReadStatus = useCallback(
    async (latestChatId: number | null) => {
      if (!latestChatId || !stompClient.connected) return false;

      await queryClient.cancelQueries({ queryKey: ROOM_KEYS.list });

      if (!stompClient.connected) return false;

      stompClient.publish({
        destination: `/pub/rooms/${roomCode}/read`,
        body: JSON.stringify({ lastReadChatId: latestChatId }),
      });

      queryClient.setQueryData<RoomListItem[]>(
        ROOM_KEYS.list,
        (oldChatRooms) => {
          if (!oldChatRooms) return oldChatRooms;

          return oldChatRooms.map((room) =>
            room.roomCode === roomCode ? { ...room, unreadCount: 0 } : room,
          );
        },
      );

      return true;
    },
    [queryClient, roomCode],
  );

  return { isConnected, sendReadStatus };
};
