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
        className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-blue-500 px-4 text-sm font-bold text-white shadow-sm shadow-blue-100 transition-all hover:bg-blue-400 active:scale-95"
      >
        <Plus className="h-4.5 w-4.5" />
        <span>새 방</span>
      </button>

      {isOpen && (
        <Dialog title="새로운 채팅방" onClose={() => setIsOpen(false)}>
          <RoomCreateModalContent onClose={() => setIsOpen(false)} />
        </Dialog>
      )}
    </>
  );
}
