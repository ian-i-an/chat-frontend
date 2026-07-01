import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useWebSocketConnection } from "@/websocket/WebSocketContext";
import { stompClient } from "@/websocket/websocket-client";
import type { RoomListItem } from "@/types/types";
import { ROOM_KEYS } from "../hooks/use-room";

type RoomUpdateEvent = Pick<RoomListItem, "lastMessage" | "roomCode"> & {
  isMyMessage: boolean;
};

export const useChatListWebSocket = () => {
  const isConnected = useWebSocketConnection();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isConnected) return;

    const subscription = stompClient.subscribe(
      `/user/queue/rooms`,
      (message) => {
        const updateData: RoomUpdateEvent = JSON.parse(message.body);

        queryClient.setQueryData<RoomListItem[]>(ROOM_KEYS.list, (oldRooms) => {
          if (!oldRooms) return oldRooms;

          const targetIndex = oldRooms.findIndex(
            (room) => room.roomCode === updateData.roomCode,
          );

          if (targetIndex === -1) return oldRooms;

          const updatedRoom: RoomListItem = {
            ...oldRooms[targetIndex],
            lastMessage: updateData.lastMessage,
            unreadCount: updateData.isMyMessage
              ? 0
              : oldRooms[targetIndex].unreadCount + 1,
          };

          const newRooms = [...oldRooms];
          newRooms.splice(targetIndex, 1);
          newRooms.unshift(updatedRoom);

          return newRooms;
        });
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [isConnected, queryClient]);
};
