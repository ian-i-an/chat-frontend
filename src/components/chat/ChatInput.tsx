import { Send } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import IconButton from "../common/IconButton";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";

    const fullHeight = textarea.scrollHeight; //텍스트 + 내부 여백 padding
    textarea.style.height = `${fullHeight}px`;

    const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight); // 텍스트 한 줄의 높이
    const isNowMultiline = fullHeight > lineHeight * 1.5;

    setIsMultiline(isNowMultiline);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    resizeTextarea();
  };

  const handleSend = () => {
    if (!content.trim()) return;

    onSendMessage(content);
    setContent("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setIsMultiline(false);
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
    <div
      className={`gap-2 rounded-2xl border-2 border-blue-200 bg-white ${
        isMultiline
          ? "flex flex-col px-4 py-2"
          : "flex items-center py-1 pr-2 pl-4"
      }`}
    >
      <textarea
        value={content}
        ref={textareaRef}
        rows={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="메시지 보내기"
        className={`max-h-80 resize-none overflow-y-auto bg-transparent text-base leading-relaxed font-medium text-gray-800 placeholder-gray-400 focus:outline-none ${
          isMultiline ? "" : "my-1.5 flex-1"
        }`}
      />

      <IconButton
        className={`${isMultiline ? "self-end" : ""}`}
        variant="primary"
      >
        <Send className="-ml-0.5 h-4 w-4" />
      </IconButton>
    </div>
  );
}
