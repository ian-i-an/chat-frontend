import type { ChatCursor } from "@/types/types";
import { client } from "./client";

const ENDPOINT = "/api/rooms";

export const fetchChats = async ({
  roomId,
  limit,
  cursor,
}: {
  roomId: number;
  limit?: number;
  cursor?: number;
}) => {
  if (!limit) limit = 20;
  const response = await client.get<ChatCursor>(`${ENDPOINT}/${roomId}/chats`, {
    params: { limit, cursor },
  });
  return response.data;
};
