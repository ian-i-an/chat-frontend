import type { ChatCursor } from "@/types/types";
import { client } from "./client";

const ENDPOINT = "/api/rooms";

export const fetchChats = async ({
  roomCode,
  limit,
  cursor,
}: {
  roomCode: string;
  limit?: number;
  cursor?: number;
}) => {
  if (!limit) limit = 20;
  const response = await client.get<ChatCursor>(
    `${ENDPOINT}/${roomCode}/chats`,
    {
      params: { limit, cursor },
    },
  );
  return response.data;
};

export const deleteChat = async ({
  roomCode,
  chatId,
}: {
  roomCode: string;
  chatId: number;
}) => {
  await client.delete<void>(`${ENDPOINT}/${roomCode}/chats/${chatId}`);
};
