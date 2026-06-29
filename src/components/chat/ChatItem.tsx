import type { Chat } from "@/types/types";
import { formatTime } from "@/utils/time";

export default function ChatItem({
  chat,
  amIOwner,
}: {
  chat: Chat;
  amIOwner: boolean;
}) {
  const isRightSide = amIOwner === chat.isOwner;
  return (
    <div
      className={`flex max-w-[85%] items-end gap-1.5 ${
        isRightSide ? "flex-row-reverse self-end" : ""
      }`}
    >
      <div
        className={`break-all whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed font-medium shadow-sm ${
          isRightSide
            ? "rounded-tr-none bg-blue-500 text-white"
            : "rounded-tl-none border border-gray-100 bg-white text-gray-800"
        }`}
      >
        {chat.content}
      </div>

      <span className="min-w-max pb-1 text-[9px] font-medium text-gray-400">
        {formatTime(chat.createdAt)}
      </span>
    </div>
  );
}
