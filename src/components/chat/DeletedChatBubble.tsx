export default function DeletedChatBubble({
  isHighlighted,
}: {
  isHighlighted: boolean;
}) {
  return (
    <div
      className={`relative z-10 break-all whitespace-pre-wrap rounded-xs border border-gray-200
bg-gray-200/70 px-3.5 py-2.5 text-xs leading-relaxed font-medium text-gray-500 shadow-none
transition-all duration-300 ${isHighlighted ? "animate-reply-highlight" : ""}`}
    >
      <span className="font-semibold">삭제된 메시지입니다</span>
    </div>
  );
}
