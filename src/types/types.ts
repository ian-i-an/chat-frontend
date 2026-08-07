export interface RoomListItem extends Room {
  lastMessage: string;
  unreadCount: number;
}

export interface Room {
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
  chat: ChatView;
}

export type ChatSseEventType = "CREATED" | "DELETED";

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

    
export interface ChatView {
  id: number;
  content: string | null;
  isOwner: boolean;
  isDeleted: boolean;
  createdAt: string;
  replyTo: ReplyView | null;
}

export interface UserDto {
  id: number;
  nickname: string;
}

export interface ChatCursor {
  chats: ChatView[];
  hasNext: boolean;
}


export type RoomSseEvent = {
  roomCode: string;
  lastMessage: string;
  isMyMessage: boolean;
};