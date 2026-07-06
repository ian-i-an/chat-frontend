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
  | {
      type: "WAITING";
    }
  | {
      type: "MATCHED";
    }
  | {
      type: "PARTNER_LEFT";
    }
  | {
      type: "ENDED";
    }
  | {
      type: "ERROR";
    }
  | {
      type: "MESSAGE";
      content: string;
      isMine: boolean;
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
