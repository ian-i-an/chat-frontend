export interface RoomListItem extends Room {
  lastMessage: string;
  unreadCount: number;
}

export interface Room {
  roomCode: string;
  name: string;
  isMyRoom: boolean;
}

export interface ReplyTo {
  id: number;
  content: string | null;
}

export interface ChatEventPayload {
  type: ChatEventType;
  chat: Chat;
}

export type ChatEventType = "CREATED" | "DELETED";

export type RandomChatEvent =
  | { type: "WAITING" | "MATCHED" | "PARTNER_LEFT" | "ENDED" | "ERROR" }
  | { type: "MESSAGE"; content: string; isMine: boolean };

export type RandomMessage =
  | {
      id: string;
      type: "message";
      content: string;
      isMine: boolean;
    }
  | {
      id: string;
      type: "system";
      content: string;
    };

export interface Chat {
  id: number;
  content: string | null;
  isOwner: boolean;
  isDeleted: boolean;
  createdAt: string;
  replyTo: ReplyTo | null;
}

export interface User {
  id: number;
  nickname: string;
}

export interface ChatCursor {
  chats: Chat[];
  hasNext: boolean;
}

export interface ErrorResponse {
  code: string;
  message: string;
  details: Record<string, unknown>;
}
