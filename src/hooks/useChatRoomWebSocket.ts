import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useWebSocketConnection } from "@/context/WebSocketContext";
import { stompClient } from "@/api/websocket-client";
import type { ChatRoomListItem } from "@/types";
import { CHAT_ROOM_KEYS } from "./useChatRoom";

type ChatRoomUpdateEvent = Pick<ChatRoomListItem, "lastMessage" | "id"> & {
  isMyMessage: boolean;
};

export const useChatListWebSocket = (myUserId?: number) => {
  const isConnected = useWebSocketConnection();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isConnected || !myUserId) return;

    const subscription = stompClient.subscribe(
      `/sub/users/${myUserId}/chat-rooms`,
      (message) => {
        const updateData: ChatRoomUpdateEvent = JSON.parse(message.body);

        queryClient.setQueryData<ChatRoomListItem[]>(
          CHAT_ROOM_KEYS.list,
          (oldChatRooms) => {
            if (!oldChatRooms) return oldChatRooms;

            const targetIndex = oldChatRooms.findIndex(
              (room) => room.id === updateData.id,
            );

            const updatedRoom: ChatRoomListItem = {
              ...oldChatRooms[targetIndex],
              lastMessage: updateData.lastMessage,
              unreadCount: updateData.isMyMessage
                ? 0
                : oldChatRooms[targetIndex].unreadCount + 1,
            };

            const newRooms = [...oldChatRooms];
            newRooms.splice(targetIndex, 1);
            newRooms.unshift(updatedRoom);

            return newRooms;
          },
        );
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [isConnected, myUserId, queryClient]);
};
