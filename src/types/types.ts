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

export interface RoomSseEvent {
  roomCode: string;
  lastMessage: string;
  isMyMessage: boolean;
}

export interface QuizCreateInfo {
  title: string;
  description: string | null;
  questionCreateInfos: QuestionCreateInfo[];
}

export interface QuestionCreateInfo {
  content: string;
  optionCreateInfos: OptionCreateInfo[];
}

export interface OptionCreateInfo {
  content: string;
  correct: boolean;
}

export interface QuizMetadataUpdateInfo {
  title: string;
  description: string | null;
}

export interface QuizUpdateInfo {
  title: string;
  description: string | null;
  questionUpdateInfos: QuestionUpdateInfo[];
}

export interface QuestionUpdateInfo {
  questionId: number | null;
  content: string;
  optionUpdateInfos: OptionUpdateInfo[];
}

export interface OptionUpdateInfo {
  optionId: number | null;
  content: string;
  correct: boolean;
}

export interface QuizDto {
  code: string;
  title: string;
  description: string | null;
  questions: QuestionDto[];
}

export interface QuestionDto {
  questionId: number;
  content: string;
  options: OptionDto[];
}

export interface OptionDto {
  optionId: number;
  content: string;
}
