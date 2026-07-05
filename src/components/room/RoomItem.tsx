import type { RoomListItem } from "@/types/types";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface RoomItemProps {
  room: RoomListItem;
  hasDivider?: boolean;
}

export default function RoomItem({ room, hasDivider = false }: RoomItemProps) {
  return (
    <Link
      to={`/${room.roomCode}`}
      className={`flex w-full cursor-pointer items-center gap-3 px-4 py-4 transition-colors hover:bg-gray-50 active:bg-gray-50 ${
        hasDivider ? "border-b border-gray-100" : ""
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-500">
        <MessageCircle className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate text-base font-bold text-gray-950">
            {room.name}
          </h3>

          {room.unreadCount > 0 && (
            <div className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-blue-500 px-1.5 text-[10px] font-bold text-white shadow-sm shadow-blue-200">
              {room.unreadCount > 99 ? "99+" : room.unreadCount}
            </div>
          )}
        </div>

        <p className="mt-0.5 truncate text-sm font-medium text-gray-500">
          {room.lastMessage || "새로운 대화를 시작해보세요."}
        </p>
      </div>
    </Link>
  );
}
