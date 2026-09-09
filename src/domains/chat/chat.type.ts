export interface ReplyView {
  id: number;
  content: string | null;
}

export interface ChatView {
  id: number;
  content: string | null;
  createdAt: string;
  isOwner: boolean;
  isDeleted: boolean;
  replyView: ReplyView | null;
}

export type ChatSseEventType = "CREATED" | "DELETED";

export interface ChatSseEvent {
  type: ChatSseEventType;
  chatView: ChatView;
}

export interface ChatCursorCondition {
  cursor?: number;
  limit: number;
}

export interface ChatCursorResponse {
  chatViews: ChatView[];
  hasNext: boolean;
}

export interface ChatSendRequest {
  content: string;
  replyToId: number | null;
}

export interface ReadRequest {
  lastReadChatId: number;
}
