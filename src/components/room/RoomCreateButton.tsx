import { Plus } from "lucide-react";
import { useState } from "react";
import BottomSheet from "../common/BottomSheet";
import ChatRoomCreateForm from "./RoomCreateForm";

export default function RoomCreateButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center bg-blue-50 justify-center gap-2 rounded-2xl
         border border-transparent  p-6  shadow-sm transition-all
          hover:border-blue-100  text-blue-500 hover:shadow-md active:border-blue-100 active:shadow-md active:scale-95"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full transition-colors bg-blue-100">
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
