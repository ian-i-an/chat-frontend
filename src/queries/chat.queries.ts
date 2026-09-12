import { deleteChat, getChats } from "../backend/chat/chat.api";
import { ROOM_KEYS } from "@/domains/room/room.queries";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

export function useGetChats(roomCode: string) {
  return useInfiniteQuery({
    initialPageParam: undefined as number | undefined,
    queryKey: ROOM_KEYS.chats(roomCode),
    queryFn: ({ pageParam: cursor }) =>
      getChats({ roomCode, cursor, limit: 50 }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext || lastPage.chatViews.length === 0) {
        return undefined;
      }

      return lastPage.chatViews[lastPage.chatViews.length - 1].id;
    },
    select: (data) => data.pages.flatMap((page) => page.chatViews),
  });
}

export function useDeleteChat(roomCode: string) {
  return useMutation({
    mutationFn: (chatId: number) => deleteChat({ roomCode, chatId }),
  });
}
