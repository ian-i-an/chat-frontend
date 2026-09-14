import type { ChatSendRequest, ReadRequest } from "@/domain/chat.type";
import { deleteChat, getChats, readChat, sendChat } from "../api/chat.api";
import { ROOM_KEYS } from "@/queries/room.queries";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { RoomListItem } from "@/domain/room.type";

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

export function useSendChat(roomCode: string) {
  return useMutation({
    mutationFn: ({ content, replyToId }: ChatSendRequest) =>
      sendChat({ roomCode, content, replyToId }),
  });
}

export function useReadChat(roomCode: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lastReadChatId }: ReadRequest) =>
      readChat({
        roomCode,
        lastReadChatId,
      }),

    onSuccess: () => {
      queryClient.setQueryData<RoomListItem[]>(ROOM_KEYS.list, (oldRooms) => {
        if (!oldRooms) return oldRooms;

        return oldRooms.map((room) =>
          room.roomCode === roomCode ? { ...room, unreadCount: 0 } : room,
        );
      });
    },
  });
}
