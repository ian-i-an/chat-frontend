import type { Chat } from "@/types/types";
import { formatTime } from "@/utils/time";
import ChatItemActionMenu from "./ChatItemActionMenu";
import ChatReplyPreview from "./ChatReplyPreview";
import DeletedChatBubble from "./DeletedChatBubble";

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
        <ChatItemActionMenu
          isRightSide={isRightSide}
          canDelete={canDelete}
          onStartReply={onStartReply}
          onDeleteChat={onDeleteChat}
        />
      )}

      {chat.replyTo && !isDeleted && (
        <ChatReplyPreview
          replyTo={chat.replyTo}
          isRightSide={isRightSide}
          onClick={onReplyPreviewClick}
        />
      )}

      <div
        className={`flex items-end gap-1.5  ${
          isRightSide ? "flex-row-reverse" : ""
        }`}
      >
        {isDeleted ? (
          <DeletedChatBubble isHighlighted={isHighlighted} />
        ) : (
          <div
            onClick={(event) => {
              event.stopPropagation();
              onToggleMenu();
            }}
            className={`relative z-10 break-all whitespace-pre-wrap rounded-2xl px-3.5 py-2.5
               text-sm leading-relaxed font-medium shadow-sm transition-all duration-300 ${
                 chat.replyTo ? "-mt-1.5" : ""
               } ${isHighlighted ? "animate-reply-highlight " : ""} ${
                 isRightSide
                   ? "rounded-tr-none bg-blue-500 text-white"
                   : "rounded-tl-none border border-gray-100 bg-white text-gray-800"
               }`}
          >
            {chat.content}
          </div>
        )}

        <span className="min-w-max pb-1 text-[9px] font-medium text-gray-400">
          {formatTime(chat.createdAt)}
        </span>
      </div>
    </div>
  );
}
