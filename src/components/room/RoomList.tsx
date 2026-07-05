import RoomCreateButton from "./RoomCreateButton";
import RoomItem from "./RoomItem";

import type { RoomListItem } from "@/types/types";

interface RoomListProps {
  rooms: RoomListItem[];
}

export default function RoomList({ rooms }: RoomListProps) {
  return (
    <div className="mx-auto flex w-full max-w-2xl min-w-64 flex-1 flex-col px-4 pt-5 pb-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-black tracking-tight text-gray-900">
            채팅방
          </h2>
          <p className="mt-1 text-sm font-medium text-gray-500">
            참여 중인 방 {rooms.length}개
          </p>
        </div>
        <RoomCreateButton />
      </div>

      {rooms.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {rooms.map((room, index) => (
            <RoomItem
              key={room.roomCode}
              room={room}
              hasDivider={index < rooms.length - 1}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 text-center">
          <p className="text-base font-bold text-gray-900">
            아직 채팅방이 없어요
          </p>
          <p className="mt-2 text-sm font-medium text-gray-500">
            새 방을 만들고 대화를 시작해보세요.
          </p>
        </div>
      )}
    </div>
  );
}
