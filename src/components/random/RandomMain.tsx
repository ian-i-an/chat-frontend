import type { ReactNode } from "react";

import ChatBubble from "../chat/ChatBubble";
import type { RandomMessage } from "@/types/types";

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
      {messages.map((message) => {
        if (message.type === "system") {
          return (
            <div key={message.id} className="flex justify-center gap-3">
              {/* <div className="flex-1 border-t border-gray-200" /> */}
              <div className="text-xs font-semibold text-gray-400">
                {message.content}
              </div>
              {/* <div className="flex-1 border-t border-gray-200" /> */}
            </div>
          );
        }

        return (
          <div
            key={message.id}
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
        );
      })}
    </div>
  );
}
