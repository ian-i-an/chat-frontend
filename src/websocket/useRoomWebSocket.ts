import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useWebSocketConnection } from "@/websocket/WebSocketContext";
import { stompClient } from "@/websocket/websocket-client";
import type { RoomListItem } from "@/types/types";
import { ROOM_KEYS } from "../hooks/useRoom";

type RoomUpdateEvent = Pick<RoomListItem, "lastMessage" | "id"> & {
  isMyMessage: boolean;
};

export const useChatListWebSocket = (myUserId?: number) => {
  const isConnected = useWebSocketConnection();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isConnected || !myUserId) return;

    const subscription = stompClient.subscribe(
      `/sub/users/${myUserId}/rooms`,
      (message) => {
        const updateData: RoomUpdateEvent = JSON.parse(message.body);

        queryClient.setQueryData<RoomListItem[]>(ROOM_KEYS.list, (oldRooms) => {
          if (!oldRooms) return oldRooms;

          const targetIndex = oldRooms.findIndex(
            (room) => room.id === updateData.id,
          );

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
  }, [isConnected, myUserId, queryClient]);
};
