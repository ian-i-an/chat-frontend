import { createRoom, fetchRoomById, fetchRooms } from "@/api/room";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ROOM_KEYS = {
  all: ["room"],
  list: ["room", "list"],
  byId: (roomCode: string) => ["room", "byId", roomCode],
  chats: (roomCode: string) => ["room", "byId", roomCode, "chats"],
};

export function useFetchRooms() {
  return useQuery({
    queryKey: ROOM_KEYS.list,
    queryFn: fetchRooms,
    // staleTime: 30000,
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

export function useFetchRoomById(roomCode: string) {
  return useQuery({
    queryKey: ROOM_KEYS.byId(roomCode),
    queryFn: () => fetchRoomById({ roomCode }),
  });
}
