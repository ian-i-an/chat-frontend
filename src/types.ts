export interface ChatRoomListItem extends ChatRoom {
  lastMessage: string;
  unreadCount: number;
}

export interface ChatRoom {
  id: number;
  name: string;
  isMyChatRoom: boolean;
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
