import { RotateCcw, TriangleAlert } from "lucide-react";

interface RoomListErrorProps {
  onRetry?: () => void;
}

export default function Fallback({ onRetry }: RoomListErrorProps) {
  return (
    <div className=" font-semibold h-full text-sm text-gray-400 flex flex-col items-center justify-center gap-4">
      <TriangleAlert className="h-6 w-6" />
      <div>오류가 발생했습니다. 잠시 후 다시 시도해 주세요</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-blue-400 active:scale-95"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          다시 시도하기
        </button>
      )}
    </div>
  );
}
