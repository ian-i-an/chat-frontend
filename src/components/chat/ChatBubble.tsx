import type { MouseEventHandler } from "react";

interface ChatBubbleProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  isRightSide: boolean;
  content: string | null;
}

export default function ChatBubble({
  onClick,
  isRightSide,
  content,
}: ChatBubbleProps) {
  return (
    <div
      onClick={onClick}
      className={`relative z-10 rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed font-medium break-all whitespace-pre-wrap shadow-sm ${
        isRightSide
          ? "rounded-tr-none bg-primary text-white"
          : "rounded-tl-none border border-gray-100 bg-surface text-gray-800"
      }`}
    >
      {content}
    </div>
  );
}
