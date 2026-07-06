import ChatInput from "@/components/chat/ChatInput";
import GlassChatHeader from "@/components/chat/GlassChatHeader";
import { useKeyboardInset } from "@/hooks/use-keyboard-inset";
import type { RandomChatEvent } from "@/types/types";
import { useRandomChatWebSocket } from "@/websocket/useRandomChatWebSocket";
import {
  Check,
  MessageCircle,
  Pencil,
  RotateCcw,
  ShieldCheck,
  Shuffle,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface RandomLocationState {
  initialMessage?: string;
}

export default function RandomChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialMessage =
    (location.state as RandomLocationState | null)?.initialMessage?.trim() ??
    "";
  const [requestMessage, setRequestMessage] = useState(initialMessage);
  const [draftMessage, setDraftMessage] = useState(initialMessage);
  const [isEditingRequestMessage, setIsEditingRequestMessage] =
    useState(!initialMessage);
  const [isMatched, setIsMatched] = useState(false);
  const showRequestMessage = !isMatched;
  useKeyboardInset();

  const handleRandomChatEvent = (event: RandomChatEvent) => {
    if (event.type === "MATCHED") {
      setIsMatched(true);
      return;
    }

    if (event.type === "WAITING" || event.type === "PARTNER_LEFT") {
      setIsMatched(false);
    }
  };

  const { startRandomChat, sendRandomChatMessage } = useRandomChatWebSocket(
    handleRandomChatEvent,
  );

  const handleSendMessage = (content: string) => {
    sendRandomChatMessage(content);
  };

  const handleSaveRequestMessage = () => {
    const nextMessage = draftMessage.trim();
    if (!nextMessage) return;

    setRequestMessage(nextMessage);
    setDraftMessage(nextMessage);
    setIsEditingRequestMessage(false);
  };

  const handleEditRequestMessage = () => {
    setDraftMessage(requestMessage);
    setIsEditingRequestMessage(true);
  };

  const handleRematch = () => {
    setIsMatched(false);
    startRandomChat();
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-gray-50/70">
      <GlassChatHeader
        title="랜덤 채팅"
        subtitle="익명으로 연결됨"
        icon={<Shuffle className="h-4.5 w-4.5" />}
        actionIcon={<RotateCcw className="h-4.5 w-4.5" />}
        onBack={() => navigate("/")}
        onAction={handleRematch}
      />

      <main className="min-h-0 flex-1 overflow-y-auto px-4 pt-18 pb-28">
        <section className="mb-4 rounded-2xl border border-white/70 bg-white/55 p-4 shadow-sm ring-1 ring-gray-950/5 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-blue-500">
            <ShieldCheck className="h-4.5 w-4.5" />
            <span className="text-sm font-bold">익명 대화</span>
          </div>
          <p className="mt-2 text-sm leading-6 font-medium text-gray-500">
            서로의 프로필 없이 가볍게 연결돼요. 불편한 대화는 언제든 새로 연결할
            수 있어요.
          </p>
        </section>

        {showRequestMessage && (
          <section className="mb-4 rounded-2xl border border-blue-100 bg-blue-50/80 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2 text-blue-500">
                <MessageCircle className="h-4.5 w-4.5 shrink-0" />
                <span className="truncate text-sm font-bold">
                  연결 신청 메시지
                </span>
              </div>

              {isEditingRequestMessage ? (
                <button
                  type="button"
                  onClick={handleSaveRequestMessage}
                  disabled={!draftMessage.trim()}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white transition-colors active:scale-95 disabled:bg-blue-200"
                >
                  <Check className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleEditRequestMessage}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-blue-400 transition-colors active:scale-95"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              )}
            </div>

            {isEditingRequestMessage ? (
              <textarea
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.target.value)}
                rows={3}
                placeholder="처음 건넬 말을 적어주세요"
                className="mt-3 max-h-40 w-full resize-none rounded-2xl bg-white px-3.5 py-2.5 text-sm leading-relaxed font-medium text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none"
              />
            ) : (
              <p className="mt-3 rounded-2xl rounded-tr-none bg-blue-500 px-3.5 py-2.5 text-sm leading-relaxed font-medium break-all whitespace-pre-wrap text-white shadow-sm">
                {requestMessage}
              </p>
            )}

            <p className="mt-3 text-xs leading-5 font-semibold text-blue-400">
              새로운 상대를 찾을 때마다 이 메시지가 첫 메시지로 사용돼요.
            </p>
          </section>
        )}

        <div className="flex justify-center py-6">
          <div className="rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-bold text-gray-500 shadow-sm backdrop-blur-xl">
            익명의 상대를 기다리고 있어요
          </div>
        </div>
      </main>

      <div className="absolute right-2.5 bottom-3 left-2.5 z-20 mb-(--keyboard-height,0px)">
        <ChatInput onSendMessage={handleSendMessage} variant="glass" />
      </div>
    </div>
  );
}
