import { Plus } from "lucide-react";
import { useState } from "react";
import Dialog from "../common/Dialog";
import RoomCreateModalContent from "./RoomCreateModalContent";

export default function RoomCreateButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-transparent bg-blue-50 p-6 text-blue-500 shadow-sm transition-all hover:border-blue-100 hover:shadow-md active:scale-95 active:border-blue-100 active:shadow-md"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 transition-colors">
          <Plus className="h-5 w-5" />
        </div>
        <span className="text-sm font-semibold">새로운 채팅방 만들기</span>
      </button>

      {isOpen && (
        <Dialog title="새로운 채팅방" onClose={() => setIsOpen(false)}>
          <RoomCreateModalContent onClose={() => setIsOpen(false)} />
        </Dialog>
      )}
    </>
  );
}
