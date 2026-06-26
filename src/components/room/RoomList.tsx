import CreateRoomBottom from "./CreateRoomBottom";
import RoomItem from "./RoomItem";

import type { RoomListItem } from "@/types/types";

interface RoomListProps {
  rooms: RoomListItem[];
}

export default function RoomList({ rooms }: RoomListProps) {
  return (
    <div className="flex flex-1 flex-col gap-5 px-4 pb-6">
      <div className="flex items-center justify-between gap-6 border-b border-gray-100 py-6">
        <h2 className="text-xl font-bold whitespace-nowrap text-gray-800">
          내 채팅방 목록
        </h2>
        <span className="text-xs font-semibold whitespace-nowrap text-gray-400">
          총 {rooms.length}개
        </span>
      </div>

      <CreateRoomBottom />

      {rooms.map((room) => (
        <RoomItem key={room.id} room={room} />
      ))}
    </div>
  );
}
