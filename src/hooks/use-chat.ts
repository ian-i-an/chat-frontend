import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { ROOM_KEYS } from "./use-room";
import { deleteChat, fetchChats } from "@/api/chat";

export function useFetchChats(roomCode: string) {
  return useInfiniteQuery({
    initialPageParam: undefined as number | undefined,
    queryKey: ROOM_KEYS.chats(roomCode),

    queryFn: ({ pageParam: cursor }) =>
      fetchChats({ roomCode, cursor: cursor, limit: 50 }),

    // 다음 페이지를 가져올 때 어떤 cursor를 넘기면 돼?
    // 그 답을 getNextPageParam에서 반환합니다.
    // 다음 요청부터는 getNextPageParam이 반환한 값을 pageParam으로 사용.
    // undefined를 반환하면 요청을 실행하지 않음
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

export function useDeleteChat(roomCode: string) {
  return useMutation({
    mutationFn: (chatId: number) => deleteChat({ roomCode, chatId }),
  });
}
