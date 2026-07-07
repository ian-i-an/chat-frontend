import type { ReactNode } from "react";
import type { RandomMessage } from "@/pages/RandomChatPage";
import ChatBubble from "../chat/ChatBubble";

interface RandomMainProps {
  inputBarHeight: number;
  leaveButton: ReactNode;
  messages: RandomMessage[];
}

export default function RandomMain({
  messages,
  inputBarHeight,
  leaveButton,
}: RandomMainProps) {
  return (
    <div
      style={
        inputBarHeight
          ? { paddingBottom: `${inputBarHeight + 24}px` }
          : undefined
      }
      className="flex min-h-0 flex-1 flex-col-reverse gap-4 overflow-y-auto px-4 pt-18"
    >
      {leaveButton}
      {messages.map((message) => (
        <div
          className={`flex items-end gap-1.5 ${
            message.isMine ? "flex-row-reverse" : ""
          }`}
        >
          <ChatBubble
            content={message.content}
            isRightSide={message.isMine}
            isHighlighted={false}
          />
        </div>
      ))}
    </div>
  );
}
