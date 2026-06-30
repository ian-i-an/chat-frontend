import type { ReplyTo } from "@/types/types";

export default function ChatReplyPreview({
  replyTo,
  isRightSide,
  onClick,
}: {
  replyTo: ReplyTo;
  isRightSide: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative z-0 max-w-full cursor-pointer rounded-xl border border-gray-100 bg-gray-50
px-3 py-2 text-left text-xs leading-snug text-gray-500 shadow-sm transition-colors
hover:bg-gray-200/80 active:bg-gray-200/80 ${
        isRightSide ? "mr-2 rounded-br-md" : "ml-2 rounded-bl-md"
      }`}
    >
      <div className="line-clamp-2 break-all">
        {replyTo.content ?? "삭제된 메세지입니다"}
      </div>
    </button>
  );
}
