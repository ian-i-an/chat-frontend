import type { ChatCursor } from "@/types/types";

const ENDPOINT = "/api/rooms";
const API_URL = import.meta.env.VITE_API_URL;

export const fetchChats = async ({
  roomCode,
  limit,
  cursor,
}: {
  roomCode: string;
  limit?: number;
  cursor?: number;
}): Promise<ChatCursor> => {
  if (!limit) limit = 20;

  const params = new URLSearchParams({ limit: String(limit) });

  if (cursor !== undefined) {
    params.set("cursor", String(cursor));
  }

  const response = await fetch(
    `${API_URL}${ENDPOINT}/${roomCode}/chats?${params}`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const deleteChat = async ({
  roomCode,
  chatId,
}: {
  roomCode: string;
  chatId: number;
}): Promise<void> => {
  const response = await fetch(
    `${API_URL}${ENDPOINT}/${roomCode}/chats/${chatId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};
