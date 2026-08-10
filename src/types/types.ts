export interface RoomListItem {
  roomCode: string;
  name: string;
  lastMessage: string;
  unreadCount: number;
}

export interface RoomDto {
  roomCode: string;
  name: string;
  isMyRoom: boolean;
}

export interface ReplyView {
  id: number;
  content: string | null;
}

export interface ChatSseEvent {
  type: ChatSseEventType;
  chatView: ChatView;
}

export type ChatSseEventType = "CREATED" | "DELETED";

export interface ChatView {
  id: number;
  content: string | null;
  isOwner: boolean;
  isDeleted: boolean;
  createdAt: string;
  replyView: ReplyView | null;
}

export interface UserDto {
  id: number;
  nickname: string;
}

export interface ChatCursor {
  chatViews: ChatView[];
  hasNext: boolean;
}

export type RoomSseEvent = {
  roomCode: string;
  lastMessage: string;
  isMyMessage: boolean;
};
