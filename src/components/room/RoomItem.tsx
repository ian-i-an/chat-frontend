import type { RoomListItem } from "@/types/types";
import { Link } from "react-router-dom";

export default function RoomItem({ room }: { room: RoomListItem }) {
  return (
    <Link
      to={`/rooms/${room.id}`}
      className="cursor-pointer flex w-full items-center justify-between gap-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-gray-200 hover:shadow-md"
    >
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="truncate font-bold text-gray-900">{room.name}</h3>
        <p className="truncate text-xs font-medium text-gray-400">
          {room.lastMessage || "새로운 대화를 시작해보세요."}
        </p>
      </div>

      {room.unreadCount > 0 && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white shadow-sm shadow-blue-200">
          {room.unreadCount > 99 ? "99" : room.unreadCount}
        </div>
      )}
    </Link>
  );
}
