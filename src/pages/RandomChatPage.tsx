import ChatInput from "@/components/chat/ChatInput";
import GlassChatHeader from "@/components/chat/GlassChatHeader";
import { useKeyboardInset } from "@/hooks/use-keyboard-inset";
import { RotateCcw, ShieldCheck, Shuffle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RandomChatPage() {
  const navigate = useNavigate();
  useKeyboardInset();

  const handleSendMessage = () => {};

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-gray-50/70">
      <GlassChatHeader
        title="랜덤 채팅"
        subtitle="익명으로 연결됨"
        icon={<Shuffle className="h-4.5 w-4.5" />}
        actionIcon={<RotateCcw className="h-4.5 w-4.5" />}
        onBack={() => navigate("/")}
      />

      <main className="min-h-0 flex-1 overflow-y-auto px-4 pt-18 pb-28">
        <section className="mb-4 rounded-2xl border border-white/70 bg-white/55 p-4 shadow-sm ring-1 ring-gray-950/5 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-blue-500">
            <ShieldCheck className="h-4.5 w-4.5" />
            <span className="text-sm font-bold">익명 대화</span>
          </div>
          <p className="mt-2 text-sm leading-6 font-medium text-gray-500">
            서로의 프로필 없이 가볍게 연결돼요. 불편한 대화는 언제든 새로
            연결할 수 있어요.
          </p>
        </section>
      </main>

      <div className="absolute right-2.5 bottom-3 left-2.5 z-20 mb-(--keyboard-height,0px)">
        <ChatInput onSendMessage={handleSendMessage} variant="glass" />
      </div>
    </div>
  );
}
