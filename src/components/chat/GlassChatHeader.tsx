import IconButton from "@/components/common/IconButton";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

interface GlassChatHeaderProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  actionIcon: ReactNode;
  onBack: () => void;
  onAction?: () => void;
}

//이런 식으로 말고, 아예 유리 모양의 박스를 컴포넌트로 빼서 여기서 감싸자!
export default function GlassChatHeader({
  title,
  subtitle,
  icon,
  actionIcon,
  onBack,
  onAction,
}: GlassChatHeaderProps) {
  return (
    <header className="absolute top-1.5 right-2.5 left-2.5 z-20 flex h-13 items-center gap-2 rounded-2xl border border-white/60 bg-white/50 px-1.5 shadow-lg ring-1 shadow-gray-200/50 ring-gray-950/5 backdrop-blur-xl">
      <IconButton onClick={onBack} variant="ghost">
        <ChevronLeft className="h-6 w-6" />
      </IconButton>

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-500">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-base font-extrabold text-gray-950">
          {title}
        </h2>
        <p className="truncate text-xs font-medium text-gray-400">{subtitle}</p>
      </div>

      <IconButton onClick={onAction} variant="ghost">
        {actionIcon}
      </IconButton>
    </header>
  );
}
