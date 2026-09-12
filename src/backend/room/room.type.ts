export interface RoomListItem {
  roomCode: string;
  name: string;
  lastMessage: string | null;
  unreadCount: number;
}

export interface RoomDto {
  roomCode: string;
  name: string;
  isMyRoom: boolean;
}

export interface RoomSseEvent {
  roomCode: string;
  lastMessage: string;
  isMyMessage: boolean;
}
