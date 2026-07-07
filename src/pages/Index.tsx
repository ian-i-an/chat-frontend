import ChatInput from "@/components/chat/ChatInput";
import { MessageCircle, Shuffle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  const handleSubmit = (message: string) => {
    navigate("/random", { state: { initialMessage: message } });
  };

  return (
    <div className="flex flex-1 overflow-y-auto px-4 py-6">
      <main className="mx-auto flex w-full max-w-md flex-col justify-center pb-16">
        <section className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight whitespace-nowrap text-gray-900">
            지금 바로 랜덤채팅
          </h1>
          <p className="mt-3 text-sm leading-6 font-medium whitespace-nowrap text-gray-400">
            가볍게 말을 입력하면 랜덤 연결이 시작돼요
          </p>
        </section>

        <ChatInput onSendMessage={handleSubmit} />

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => navigate("/random")}
            className="flex flex-col gap-2 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-left text-blue-500 transition-all active:scale-95"
          >
            <Shuffle className="h-5 w-5" />
            <span className="text-sm font-bold">랜덤 채팅</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/rooms")}
            className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-4 text-left text-gray-600 shadow-sm transition-all active:scale-95"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-bold">나만의 익명 채팅방</span>
          </button>
        </div>
      </main>
    </div>
  );
}
