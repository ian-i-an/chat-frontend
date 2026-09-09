import type { ChatView } from "@/domains/types/types";
import { formatTime } from "@/utils/time";
import ChatItemActionMenu from "./ChatItemActionMenu";
import ChatReplyPreview from "./ChatReplyPreview";
import DeletedChatBubble from "./DeletedChatBubble";
import { useIsMenuOpen, useToggleActiveMenuId } from "@/store/room-ui-store";
import ChatBubble from "./ChatBubble";

interface ChatItemProps {
  chat: ChatView;
  amIOwner: boolean;
  canDelete: boolean;
  onDeleteChat: () => void;
}

export default function ChatItem({
  chat,
  amIOwner,
  canDelete,
  onDeleteChat,
}: ChatItemProps) {
  const isRightSide = amIOwner === chat.isOwner;
  const isDeleted = chat.isDeleted || chat.content === null;
  const toggleActiveMenuId = useToggleActiveMenuId();
  const isMenuOpen = useIsMenuOpen(chat.id);

  return (
    <div
      id={`chat-${chat.id}`}
      className={`relative flex max-w-[85%] flex-col ${
        isRightSide ? "items-end self-end" : "items-start"
      }`}
    >
      {isMenuOpen && !isDeleted && (
        <ChatItemActionMenu
          chat={chat}
          isRightSide={isRightSide}
          canDelete={canDelete}
          onDeleteChat={onDeleteChat}
        />
      )}

      {chat.replyView && !isDeleted && (
        <ChatReplyPreview
          replyTo={chat.replyView}
          isRightSide={isRightSide}
        />
      )}

      <div
        className={`flex items-end gap-1.5 ${
          isRightSide ? "flex-row-reverse" : ""
        }`}
      >
        {isDeleted ? (
          <DeletedChatBubble />
        ) : (
          <ChatBubble
            onClick={(event) => {
              event.stopPropagation();
              toggleActiveMenuId(chat.id);
            }}
            content={chat?.content}
            isRightSide={isRightSide}
          />
        )}

        <span className="min-w-max pb-1 text-[9px] font-medium text-subtle-foreground">
          {formatTime(chat.createdAt)}
        </span>
      </div>
    </div>
  );
}
