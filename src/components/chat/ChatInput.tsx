import { Send, X } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import IconButton from "../common/IconButton";
import { useCloseReply, useReplyTo } from "@/store/room-ui-store";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const replyTo = useReplyTo();
  const closeReply = useCloseReply();
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (!content.trim()) return;

    onSendMessage(content);
    setContent("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 한글 등 IME 조합 중에는 Enter를 무시 (마지막 글자 중복 전송 방지)
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div className="mb-(--keyboard-height,0px) shrink-0 border-t border-gray-100 bg-white px-4 py-3">
      <div className="flex flex-col rounded-2xl bg-gray-100 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-200">
        {replyTo && (
          <div className="flex items-center justify-between gap-3 rounded-t-2xl border border-gray-100 bg-white py-2 shadow-2xs">
            <div className="flex min-w-0 flex-col gap-1 pr-2 pl-4">
              <div className="text-[11px] font-bold text-blue-500">
                {replyTo.isOwner ? "방장 메시지에 답장" : "익명 메시지에 답장"}
              </div>
              <div className="line-clamp-2 text-xs font-medium break-all text-gray-500">
                {replyTo.content}
              </div>
            </div>
            <IconButton onClick={closeReply}>
              <X className="h-4 w-4" />
            </IconButton>
          </div>
        )}
        <div className="flex min-h-12 items-center justify-between gap-3 pr-2 pl-4">
          <textarea
            value={content}
            ref={textareaRef}
            rows={1}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="메시지 보내기"
            className="my-1.5 max-h-21 flex-1 resize-none overflow-y-auto bg-transparent text-base leading-relaxed font-medium text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
          >
            <Send className="-ml-0.5 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
