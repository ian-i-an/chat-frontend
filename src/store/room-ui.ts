import type { Chat } from "@/types/types";
import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";

type State = {
  actionMenuId: number | null;
  replyTo: Chat | null;
};

const initialState: State = {
  actionMenuId: null,
  replyTo: null,
};

const useRoomUiStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        toggleActiveMenuId: (chatId: number) => {
          set((state) => ({
            actionMenuId: state.actionMenuId === chatId ? null : chatId,
          }));
        },

        closeActiveMenu: () => {
          set({ actionMenuId: null });
        },

        closeReply: () => {
          set({ replyTo: null });
        },

        startReply: (chat: Chat) => {
          set({ replyTo: chat, actionMenuId: null });
        },
      },
    })),
    {
      name: "Room UI Store",
    },
  ),
);

export const useActiveMenuId = () => {
  const activeMenuId = useRoomUiStore((state) => state.actionMenuId);
  return activeMenuId;
};
export const useReplyTo = () => {
  const replyTo = useRoomUiStore((state) => state.replyTo);
  return replyTo;
};

//actions
export const useToggleActiveMenuId = () => {
  const toggleActiveMenuId = useRoomUiStore(
    (state) => state.actions.toggleActiveMenuId,
  );
  return toggleActiveMenuId;
};

export const useCloseActiveMenu = () => {
  const closeActiveMenu = useRoomUiStore(
    (state) => state.actions.closeActiveMenu,
  );
  return closeActiveMenu;
};

export const useCloseReply = () => {
  const closeReply = useRoomUiStore((state) => state.actions.closeReply);
  return closeReply;
};

export const useStartReply = () => {
  const startReply = useRoomUiStore((state) => state.actions.startReply);
  return startReply;
};
