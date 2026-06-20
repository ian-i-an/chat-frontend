import type { ChatRoom, ChatRoomListItem } from "@/types";
import { client } from "./client";

export const createChatRoom = async ({
  chatRoomName,
}: {
  chatRoomName: string;
}) => {
  const response = await client.post<ChatRoomListItem>("/api/chat-rooms", {
    chatRoomName,
  });
  return response.data;
};

export const fetchChatRooms = async () => {
  const response = await client.get<ChatRoomListItem[]>("/api/chat-rooms");
  return response.data;
};

export const fetchChatRoomById = async ({
  chatRoomId,
}: {
  chatRoomId: number;
}) => {
  const response = await client.get<ChatRoom>(`api/chat-rooms/${chatRoomId}`);
  return response.data;
};
