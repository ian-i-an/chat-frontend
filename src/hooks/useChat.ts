import { useInfiniteQuery } from "@tanstack/react-query";
import { CHAT_ROOM_KEYS } from "./useChatRoom";
import { fetchChats } from "@/api/chat";

export function useFetchChats(chatRoomId: number) {
  return useInfiniteQuery({
    initialPageParam: undefined as number | undefined,
    queryKey: CHAT_ROOM_KEYS.chats(chatRoomId),

    queryFn: ({ pageParam }) =>
      fetchChats({ chatRoomId, cursor: pageParam, limit: 50 }),

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
