import {
  createChatRoom,
  fetchChatRoomById,
  fetchChatRooms,
} from "@/api/chat-room";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const CHAT_ROOM_KEYS = {
  all: ["chatRoom"],
  list: ["chatRoom", "list"],
  byId: (chatRoomId: number) => ["chatRoom", "byId", chatRoomId],
  chats: (chatRoomId: number) => ["chatRoom", "byId", chatRoomId, "chats"],
};

export function useFetchChatRooms() {
  return useQuery({
    queryKey: CHAT_ROOM_KEYS.list,
    queryFn: fetchChatRooms,
  });
}

export function useCreateChatRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChatRoom,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_ROOM_KEYS.list });
    },
  });
}

export function useFetchChatRoomById(chatRoomId: number) {
  return useQuery({
    queryKey: CHAT_ROOM_KEYS.byId(chatRoomId),
    queryFn: () => fetchChatRoomById({ chatRoomId }),
  });
}
