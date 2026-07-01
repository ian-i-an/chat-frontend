import RoomList from "@/components/room/RoomList";
import RoomListSkeleton from "@/components/room/skeleton/RoomListSkeleton";
import { useFetchMyProfile } from "@/hooks/use-auth";
import { useFetchRooms } from "@/hooks/use-room";
import { useChatListWebSocket } from "@/websocket/useRoomWebSocket";
import { Navigate } from "react-router-dom";

export default function Rooms() {
  const { data: myProfile, isLoading: isFetchMyProfileLoading } =
    useFetchMyProfile();
  const { data: rooms = [], isLoading, isError } = useFetchRooms();
  useChatListWebSocket();

  if (isFetchMyProfileLoading || isLoading)
    return <RoomListSkeleton count={3} />;
  if (!myProfile || isError) return <Navigate to="/" replace />;

  return (
    <div className="flex-1 overflow-y-auto">
      <RoomList rooms={rooms} />
    </div>
  );
}
