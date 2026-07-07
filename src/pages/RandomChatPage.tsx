import ChatInput from "@/components/chat/ChatInput";
import Button from "@/components/common/Button";
import IconButton from "@/components/common/IconButton";
import RandomMain from "@/components/random/RandomMain";
import { useElementSize } from "@/hooks/use-element-size";
import { useKeyboardInset } from "@/hooks/use-keyboard-inset";
import type { RandomChatEvent, RandomMessage } from "@/types/types";
import { useRandomChatWebSocket } from "@/websocket/useRandomChatWebSocket";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Loader,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type RandomChatStatus = "idle" | "waiting" | "chatting" | "partnerLeft";

export default function RandomChatPage() {
  const { ref, height } = useElementSize<HTMLDivElement>();
  const navigate = useNavigate();
  const location = useLocation();
  const [initialMessage, setInitialMessage] = useState(
    (
      location.state as {
        initialMessage?: string;
      }
    )?.initialMessage?.trim() ?? "",
  );
  const [messages, setMessages] = useState<RandomMessage[]>([]);
  const [isEditing, setIsEditing] = useState(true);
  const [status, setStatus] = useState<RandomChatStatus>("idle");
  const hasStartedRef = useRef(false);

  useKeyboardInset();

  const handleRandomChatEvent = (event: RandomChatEvent) => {
    if (event.type === "MATCHED") {
      setMessages([
        {
          id: crypto.randomUUID(),
          content: "상대와 연결되었습니다",

          type: "system",
        },
      ]);
      setStatus("chatting");

      return;
    }
    if (event.type === "MESSAGE") {
      setMessages((prevMessages) => [
        {
          id: crypto.randomUUID(),
          content: event.content,
          isMine: event.isMine,
          type: "message",
        },
        ...prevMessages,
      ]);

      return;
    }

    if (event.type === "WAITING") {
      setStatus("waiting");
      if (initialMessage.trim()) {
        setMessages([
          {
            id: crypto.randomUUID(),
            content: initialMessage,
            isMine: true,
            type: "message",
          },
        ]);
      }

      return;
    }

    if (event.type === "PARTNER_LEFT") {
      setStatus("partnerLeft");
      setMessages((prevMessages) => [
        {
          id: crypto.randomUUID(),
          content: "상대방이 채팅을 떠났습니다",

          type: "system",
        },
        ...prevMessages,
      ]);
      return;
    }

    if (event.type === "ENDED" || event.type === "ERROR") {
      setStatus("idle");
      setMessages([]);
      return;
    }
  };

  const {
    isConnected,
    startRandomChat,
    sendRandomChatMessage,
    leaveRandomChat,
  } = useRandomChatWebSocket(handleRandomChatEvent);

  const handleSendMessage = (content: string) => {
    if (status === "chatting") {
      sendRandomChatMessage(content);
    }
  };

  const handleStartMatching = () => {
    startRandomChat(initialMessage);
  };

  const handleRestartMatching = () => {
    setMessages([]);
    startRandomChat(initialMessage);
  };

  const handleLeaveRandomChat = () => {
    setStatus("idle");
    setMessages([]);
    leaveRandomChat();
  };

  useEffect(() => {
    if (hasStartedRef.current) return;
    if (!isConnected) return;

    hasStartedRef.current = true;

    startRandomChat(initialMessage);
  }, [isConnected, initialMessage, setStatus, startRandomChat]);

  const RandomStatusButton =
    status === "idle" ? (
      <Button
        onClick={handleStartMatching}
        className="flex flex-1 items-center justify-center gap-2"
      >
        <Search className="h-4 w-4" />
        연결 시작
      </Button>
    ) : status === "waiting" ? (
      <Button
        onClick={handleLeaveRandomChat}
        variant="outline"
        className="flex flex-1 items-center justify-center gap-2"
      >
        <Loader className="h-4 w-4 animate-spin" />
        대기 중
      </Button>
    ) : status === "chatting" ? (
      <Button
        onClick={handleLeaveRandomChat}
        variant="outline"
        className="flex items-center justify-center gap-2 px-4"
      >
        종료
      </Button>
    ) : status === "partnerLeft" ? (
      <Button
        onClick={handleRestartMatching}
        className="flex flex-1 items-center justify-center gap-2"
      >
        <Search className="h-4 w-4" />
        재연결
      </Button>
    ) : null;

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-gray-50/70">
      <div className="absolute top-1.5 right-2.5 left-2.5 z-20 flex flex-col gap-2 rounded-2xl border border-white/50 bg-gray-50/50 px-1.5 py-2 shadow-lg ring-1 shadow-gray-200/50 ring-gray-950/5 backdrop-blur-xs">
        <div className="flex justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            <IconButton onClick={() => navigate("/")}>
              <ChevronLeft className="h-6 w-6" />
            </IconButton>

            <div className="flex min-w-0 items-center gap-2 text-blue-500">
              <MessageCircle className="h-4.5 w-4.5 shrink-0" />
              <span className="truncate text-base font-bold">랜덤채팅</span>
            </div>
          </div>
          {(status === "idle" || status === "partnerLeft") && (
            <IconButton onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? (
                <ChevronUp className="h-6 w-6" />
              ) : (
                <ChevronDown className="h-6 w-6" />
              )}
            </IconButton>
          )}
        </div>

        {isEditing && (status === "idle" || status === "partnerLeft") && (
          <div className="flex w-full flex-col gap-2 rounded-2xl px-4 pt-3 pb-1 shadow-lg ring-1 shadow-gray-200/50 ring-gray-950/5">
            <textarea
              value={initialMessage}
              onChange={(event) => setInitialMessage(event.target.value)}
              rows={3}
              maxLength={100}
              placeholder="처음 건넬 말을 적어주세요"
              className="max-h-40 w-full resize-none bg-transparent text-sm leading-relaxed font-medium text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <div className="flex justify-between">
              <p className="mt-3 text-xs leading-5 font-semibold text-blue-400">
                입력하지 않으면 첫 메시지 없이 상대를 찾습니다.
              </p>
              <div className="self-end text-right text-xs font-medium text-gray-400">
                {initialMessage.length}/100
              </div>
            </div>
          </div>
        )}
      </div>

      {status === "waiting" && (
        <div className="mt-18 px-2.5">
          <div className="flex-1 rounded-2xl border border-white/50 bg-white/50 p-4 shadow-sm ring-1 ring-gray-950/5 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-blue-500">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span className="text-sm font-bold">익명 대화</span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-6 font-medium text-gray-500">
              서로의 프로필 없이 가볍게 연결돼요.
              <br /> 불편한 대화는 언제든 새로 연결할 수 있어요.
            </p>
          </div>
        </div>
      )}

      <RandomMain
        messages={messages}
        leaveButton={status === "chatting" && RandomStatusButton}
        inputBarHeight={height}
      />

      <div
        ref={ref}
        className="absolute right-2.5 bottom-3 left-2.5 z-20 mb-(--keyboard-height,0px)"
      >
        {status === "chatting" ? (
          <ChatInput onSendMessage={handleSendMessage} />
        ) : (
          <div className="flex w-full">{RandomStatusButton}</div>
        )}
      </div>
    </div>
  );
}
