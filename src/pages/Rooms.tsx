import RoomList from "@/components/room/RoomList";
import RoomListSkeleton from "@/components/room/skeleton/RoomListSkeleton";
import { useFetchMyProfile } from "@/hooks/use-auth";
import { ROOM_KEYS, useFetchRooms } from "@/hooks/use-room";
import { useRoomSse } from "@/sse/useRoomSse";
import type { RoomListItem } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

export default function Rooms() {
  const queryClient = useQueryClient();
  const { data: myProfile, isLoading: isFetchMyProfileLoading } =
    useFetchMyProfile();
  const { data: rooms = [], isLoading, isError } = useFetchRooms();

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

  if (isFetchMyProfileLoading || isLoading)
    return <RoomListSkeleton count={3} />;
  if (!myProfile || isError) return <Navigate to="/" replace />;

  return (
    <div className="flex-1 overflow-y-auto">
      <RoomList rooms={rooms} />
    </div>
  );
}
