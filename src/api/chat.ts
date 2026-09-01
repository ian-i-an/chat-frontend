import type { ChatCursor, ChatView } from "@/types/types";

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
  if (!limit) limit = 50;

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

export const sendChat = async ({
  roomCode,
  content,
  replyToId,
}: {
  roomCode: string;
  content: string;
  replyToId?: number;
}): Promise<ChatView> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${roomCode}/chats`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, replyToId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const sendReadStatus = async ({
  roomCode,
  lastReadChatId,
}: {
  roomCode: string;
  lastReadChatId: number;
}): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${roomCode}/read`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lastReadChatId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};
