import {
  create,
  deleteRoom,
  getMyRooms,
  getRoom,
  update,
} from "@/api/room.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ROOM_KEYS = {
  all: ["room"],
  list: ["room", "list"],
  byId: (roomCode: string) => ["room", "byId", roomCode],
  chats: (roomCode: string) => ["room", "byId", roomCode, "chats"],
};

export function useCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_KEYS.list });
    },
  });
}
export function useGetMyRooms() {
  return useQuery({
    queryKey: ROOM_KEYS.list,
    queryFn: getMyRooms,
    // staleTime: 30000,
  });
}

export function useGetRoom(roomCode: string) {
  return useQuery({
    queryKey: ROOM_KEYS.byId(roomCode),
    queryFn: () => getRoom({ roomCode }),
    enabled: !!roomCode,
  });
}

export function useUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: update,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_KEYS.list });
    },
  });
}

export function useDeleteRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRoom,
    onSuccess: (_, { roomCode }) => {
      queryClient.removeQueries({ queryKey: ROOM_KEYS.byId(roomCode) });
      return queryClient.invalidateQueries({ queryKey: ROOM_KEYS.list });
    },
  });
}
