import { Plus } from "lucide-react";
import { useState } from "react";
import BottomSheet from "../common/BottomSheet";
import ChatRoomCreateForm from "./RoomCreateForm";

export default function CreateRoomBottom() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-transparent bg-gray-100 p-6 text-gray-500 shadow-sm transition-all hover:border-blue-100 hover:bg-blue-50 hover:text-blue-500 hover:shadow-md active:scale-95"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 transition-colors group-hover:bg-blue-100">
          <Plus className="h-5 w-5" />
        </div>
        <span className="text-sm font-semibold">새로운 채팅방 만들기</span>
      </button>

      {isOpen && (
        <BottomSheet onClose={() => setIsOpen(false)}>
          <ChatRoomCreateForm onClose={() => setIsOpen(false)} />
        </BottomSheet>
      )}
    </>
  );
}
