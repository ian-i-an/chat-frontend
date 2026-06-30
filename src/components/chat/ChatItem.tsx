import type { Chat } from "@/types/types";
import { formatTime } from "@/utils/time";
import { Reply, Trash2 } from "lucide-react";

export default function ChatItem({
  chat,
  amIOwner,
  isMenuOpen,
  isHighlighted,
  canDelete,
  onToggleMenu,
  onStartReply,
  onDeleteChat,
  onReplyPreviewClick,
}: {
  chat: Chat;
  amIOwner: boolean;
  isMenuOpen: boolean;
  isHighlighted: boolean;
  canDelete: boolean;
  onToggleMenu: () => void;
  onStartReply: () => void;
  onDeleteChat: () => void;
  onReplyPreviewClick: () => void;
}) {
  const isRightSide = amIOwner === chat.isOwner;
  const isDeleted = chat.isDeleted || chat.content === null;

  return (
    <div
      id={`chat-${chat.id}`}
      className={`relative flex max-w-[85%] flex-col ${
        isRightSide ? "items-end self-end" : "items-start"
      }`}
    >
      {isMenuOpen && !isDeleted && (
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
      )}

      {chat.replyTo && !isDeleted && (
        <button
          type="button"
          onClick={onReplyPreviewClick}
          className={`relative z-0 max-w-full rounded-xl border border-gray-200 bg-gray-100
             text-gray-500 hover:bg-gray-200/80 active:bg-gray-200/80 px-3 py-2 text-left text-xs
              leading-snug shadow-sm transition-colors ${
                isRightSide ? "mr-2 rounded-br-md " : "ml-2 rounded-bl-md "
              }`}
        >
          <div className="line-clamp-2 break-all">
            {chat.replyTo.content ?? "삭제된 메세지입니다"}
          </div>
        </button>
      )}

      <div
        className={`flex items-end gap-1.5  ${
          isRightSide ? "flex-row-reverse" : ""
        }`}
      >
        <div
          onClick={(event) => {
            event.stopPropagation();
            if (!isDeleted) {
              onToggleMenu();
            }
          }}
          className={`relative z-10 break-all whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed font-medium shadow-sm transition-all duration-300 ${
            chat.replyTo ? "-mt-1.5" : ""
          } ${isHighlighted ? "animate-reply-highlight " : ""} 
          ${
            isDeleted
              ? "rounded-xl border border-gray-300 bg-gray-200/80 text-xs text-gray-500 shadow-none"
              : isRightSide
                ? "rounded-tr-none bg-blue-500 text-white"
                : "rounded-tl-none border border-gray-100 bg-white text-gray-800"
          }`}
        >
          {isDeleted ? (
            <span className="font-semibold">삭제된 메시지입니다</span>
          ) : (
            chat.content
          )}
        </div>

        <span className="min-w-max pb-1 text-[9px] font-medium text-gray-400">
          {formatTime(chat.createdAt)}
        </span>
      </div>
    </div>
  );
}
