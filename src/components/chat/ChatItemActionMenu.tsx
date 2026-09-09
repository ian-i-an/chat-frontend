import { useStartReply } from "@/store/room-ui-store";
import type { ChatView } from "@/domains/chat/chat.type";
import { Reply, Trash2 } from "lucide-react";
interface ChatIemACtionMenuProps {
  chat: ChatView;
  isRightSide: boolean;
  canDelete: boolean;
  onDeleteChat: () => void;
}

export default function ChatItemActionMenu({
  chat,
  isRightSide,
  canDelete,
  onDeleteChat,
}: ChatIemACtionMenuProps) {
  const startReply = useStartReply();
  return (
    <div
      className={`absolute -top-12 z-50 flex items-center rounded-2xl glass p-1  transition-all duration-200 ${
        isRightSide ? "right-0" : "left-0"
      }`}
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          startReply(chat);
        }}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 transition-colors
glass-hover"
      >
        <Reply size={16} strokeWidth={2.5} />
      </button>
      {canDelete && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDeleteChat();
          }}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-danger transition-colors
hover:bg-danger/10 active:bg-danger/20"
        >
          <Trash2 size={16} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
