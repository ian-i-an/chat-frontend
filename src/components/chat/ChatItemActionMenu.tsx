import { Reply, Trash2 } from "lucide-react";

export default function ChatItemActionMenu({
  isRightSide,
  canDelete,
  onStartReply,
  onDeleteChat,
}: {
  isRightSide: boolean;
  canDelete: boolean;
  onStartReply: () => void;
  onDeleteChat: () => void;
}) {
  return (
    <div
      className={`absolute -top-12 z-50 flex items-center rounded-2xl border border-gray-200/60
bg-white/40 p-1 shadow-md backdrop-blur-xs transition-all duration-200 ${
        isRightSide ? "right-0" : "left-0"
      }`}
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onStartReply();
        }}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 transition-colors
hover:bg-black/5 active:bg-black/10"
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
          className="flex h-9 w-9 items-center justify-center rounded-xl text-red-500 transition-colors
hover:bg-red-500/10 active:bg-red-500/20"
        >
          <Trash2 size={16} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
