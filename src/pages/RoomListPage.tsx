import Loader from "@/components/common/Loader";
import RoomList from "@/components/room/RoomList";
import { ROOM_KEYS, useGetMyRooms } from "@/backend/room/room.queries";
import type { RoomListItem } from "@/backend/room/room.type";
import { useRoomSse } from "@/sse/useRoomSse";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

export default function RoomListPage() {
  const queryClient = useQueryClient();
  const { data: rooms = [], isLoading, isError } = useGetMyRooms();

  useRoomSse({
    onEventReceived: (event) => {
      queryClient.setQueryData<RoomListItem[]>(ROOM_KEYS.list, (oldRooms) => {
        if (!oldRooms) return oldRooms;

        const targetIndex = oldRooms.findIndex(
          (room) => room.roomCode === event.roomCode,
        );

        if (targetIndex === -1) return oldRooms;

        const updatedRoom: RoomListItem = {
          ...oldRooms[targetIndex],
          lastMessage: event.lastMessage,
          unreadCount: event.isMyMessage
            ? 0
            : oldRooms[targetIndex].unreadCount + 1,
        };

        const newRooms = [...oldRooms];
        newRooms.splice(targetIndex, 1);
        newRooms.unshift(updatedRoom);

        return newRooms;
      });
    },
  });

  if (isLoading) return <Loader fullPage />;
  if (isError) return <Navigate to="/sign-in" replace />;

  return (
    <div className="flex-1 overflow-y-auto">
      <RoomList rooms={rooms} />
    </div>
  );
}
