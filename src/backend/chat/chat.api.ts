import type {
  ChatCursorCondition,
  ChatCursorResponse,
  ChatSendRequest,
  ChatView,
  ReadRequest,
} from "./chat.type";

const ENDPOINT = "/api/rooms";
const API_URL = import.meta.env.VITE_API_URL;

export const getChats = async ({
  roomCode,
  limit,
  cursor,
}: { roomCode: string } & ChatCursorCondition): Promise<ChatCursorResponse> => {
  const params = new URLSearchParams({ limit: String(limit) });

  if (cursor !== undefined) {
    params.set("cursor", String(cursor));
  }

  const response = await fetch(
    `${API_URL}${ENDPOINT}/${roomCode}/chats?${params}`,
    { credentials: "include" },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message, { cause: response.status });
  }

  return response.json();
};

export const sendChat = async ({
  roomCode,
  content,
  replyToId,
}: { roomCode: string } & ChatSendRequest): Promise<ChatView> => {
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
    throw new Error(error.message, { cause: response.status });
  }

  return response.json();
};

export const readChat = async ({
  roomCode,
  lastReadChatId,
}: { roomCode: string } & ReadRequest): Promise<void> => {
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
    throw new Error(error.message, { cause: response.status });
  }
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
    throw new Error(error.message, { cause: response.status });
  }
};
