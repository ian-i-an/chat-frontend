import type { Chat, ChatCursor } from "@/types";
import { client } from "./client";

export const fetchChats = async ({
  chatRoomId,
  limit,
  cursor,
}: {
  chatRoomId: number;
  limit?: number;
  cursor?: number;
}) => {
  if (!limit) limit = 20;
  const response = await client.get<ChatCursor>(
    `/api/chat-rooms/${chatRoomId}/chats`,
    {
      params: { limit, cursor },
    },
  );
  return response.data;
};

export const sendChat = async ({
  chatRoomId,
  content,
}: {
  chatRoomId: number;
  content: string;
}) => {
  const response = await client.post<Chat>(
    `/api/chat-rooms/${chatRoomId}/chats`,
    { content },
  );
  return response.data;
};
