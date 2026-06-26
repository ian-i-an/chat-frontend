export interface RoomListItem extends Room {
  lastMessage: string;
  unreadCount: number;
}

export interface Room {
  id: number;
  name: string;
  isMyRoom: boolean;
}
export interface Chat {
  id: number;
  content: string;
  isOwner: boolean;
  createdAt: string;
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
