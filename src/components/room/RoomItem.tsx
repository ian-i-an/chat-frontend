import type { RoomListItem } from "@/domains/types/types";
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
      className={`flex w-full cursor-pointer items-center gap-3 px-4 py-4 transition-colors hover:bg-background active:bg-background ${
        hasDivider ? "border-b border-gray-100" : ""
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
        <MessageCircle className="h-5 w-5" />
      </div>

      <div className="flex min-w-0 flex-1">
        <div className="min-w-0 flex-1 gap-3">
          <h3 className="truncate text-base font-bold text-foreground">
            {room.name}
          </h3>
          <p className="mt-0.5 truncate text-sm font-medium text-muted-foreground">
            {room.lastMessage || "새로운 대화를 시작해보세요."}
          </p>
        </div>
      </div>
      {room.unreadCount > 0 && (
        <div className="flex min-h-8 min-w-8 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-sm font-medium text-white shadow-sm shadow-blue-200">
          {room.unreadCount > 99 ? "99+" : room.unreadCount}
        </div>
      )}
    </Link>
  );
}
