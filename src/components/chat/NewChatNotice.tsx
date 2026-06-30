import { ChevronDown } from "lucide-react";

export default function NewChatNotice({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className="absolute inset-x-4 bottom-4 z-30 mx-auto flex max-w-[320px] items-center gap-2 rounded-full
bg-blue-500 px-3 py-2 text-left text-white shadow-lg shadow-blue-500/25 transition active:scale-95"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
        <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
      </span>
      <span className="text-xs font-semibold">새 메시지가 도착했어요</span>
    </button>
  );
}
