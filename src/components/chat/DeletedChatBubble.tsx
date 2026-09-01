export default function DeletedChatBubble() {
  return (
    <div
      className={`relative z-10 break-all whitespace-pre-wrap rounded-xs border border-border
bg-gray-200/70 px-3.5 py-2.5 text-xs leading-relaxed font-medium text-muted-foreground shadow-none
transition-all duration-300`}
    >
      <span className="font-semibold">삭제된 메시지입니다</span>
    </div>
  );
}
