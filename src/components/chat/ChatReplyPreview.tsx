import type { ReplyView } from "@/domains/types/types";

export default function ChatReplyPreview({
  replyTo,
  isRightSide,
}: {
  replyTo: ReplyView;
  isRightSide: boolean;
}) {
  return (
    <div
      className={`relative z-0 -mb-1.5 max-w-full rounded-xl border border-gray-100 bg-background px-3 py-2 text-left text-xs leading-snug text-muted-foreground shadow-sm ${
        isRightSide ? "mr-2 rounded-br-md" : "ml-2 rounded-bl-md"
      }`}
    >
      <div className="line-clamp-2 break-all">
        {replyTo.content ?? "삭제된 메세지입니다"}
      </div>
    </div>
  );
}
