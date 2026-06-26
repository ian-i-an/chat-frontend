import { createRoom, fetchRoomById, fetchRooms } from "@/api/room";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ROOM_KEYS = {
  all: ["room"],
  list: ["room", "list"],
  byId: (chatRoomId: number) => ["room", "byId", chatRoomId],
  chats: (chatRoomId: number) => ["room", "byId", chatRoomId, "chats"],
};

export function useFetchRooms() {
  return useQuery({
    queryKey: ROOM_KEYS.list,
    queryFn: fetchRooms,
  });
}

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoom,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_KEYS.list });
    },
  });
}

export function useFetchRoomById(roomId: number) {
  return useQuery({
    queryKey: ROOM_KEYS.byId(roomId),
    queryFn: () => fetchRoomById({ roomId }),
  });
}
