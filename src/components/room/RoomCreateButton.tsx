import { Plus } from "lucide-react";
import { useState } from "react";
import Dialog from "../common/Dialog";
import RoomCreateModalContent from "./RoomCreateModalContent";
import Button from "../common/Button";

export default function RoomCreateButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 px-3"
      >
        <Plus className="h-4.5 w-4.5" />
        <span>새로운 방</span>
      </Button>

      {isOpen && (
        <Dialog title="새로운 채팅방" onClose={() => setIsOpen(false)}>
          <RoomCreateModalContent onClose={() => setIsOpen(false)} />
        </Dialog>
      )}
    </>
  );
}
