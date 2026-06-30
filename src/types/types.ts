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
  content: string;
}

export interface Chat {
  id: number;
  content: string;
  isOwner: boolean;
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
