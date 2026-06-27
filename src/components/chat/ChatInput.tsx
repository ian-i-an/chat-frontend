import { Send } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
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
    <div className="fixed inset-x-0 bottom-0 z-10 mx-auto w-full max-w-md border-t border-gray-100 bg-white px-4 pt-3 pb-6">
      <div className="flex min-h-11 items-center gap-2 rounded-2xl bg-gray-100 pr-2 pl-4 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-200">
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
  );
}
