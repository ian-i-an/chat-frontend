import { useInfiniteQuery } from "@tanstack/react-query";
import { ROOM_KEYS } from "./useRoom";
import { fetchChats } from "@/api/chat";

export function useFetchChats(roomCode: string) {
  return useInfiniteQuery({
    initialPageParam: undefined as number | undefined,
    queryKey: ROOM_KEYS.chats(roomCode),

    queryFn: ({ pageParam }) =>
      fetchChats({ roomCode, cursor: pageParam, limit: 50 }),

    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext || lastPage.chats.length === 0) {
        return undefined;
      }

      return lastPage.chats[lastPage.chats.length - 1].id;
    },

    select: (data) => {
      return data.pages.flatMap((page) => page.chats);
    },
  });
}
