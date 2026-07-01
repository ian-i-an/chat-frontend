import { X } from "lucide-react";
import Button from "../common/Button";
import FormInput from "../common/FormInput";
import { useState } from "react";
import { useCreateRoom as useCreateRoom } from "@/hooks/use-room";
import { toast } from "sonner";

export default function ChatRoomCreateForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [roomName, setRoomName] = useState("");
  const { mutate: createRoom, isPending } = useCreateRoom();

  const handleCreate = async () => {
    createRoom(
      { roomName },
      {
        onSuccess: () => {
          toast.success("채팅방을 만들었습니다!");
          onClose();
          setRoomName("");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0">
        <div className="py-3">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-200" />
        </div>
        <div className="flex items-center justify-between px-6 py-2">
          <h3 className="text-lg font-bold">새로운 채팅방</h3>
          <button
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 pt-4 pb-8">
        <FormInput
          disabled={isPending}
          label="채팅방 이름"
          placeholder="예: 스터디 모임 방"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          autoFocus
        />

        <Button onClick={handleCreate} disabled={!roomName.trim() || isPending}>
          채팅방 생성하기
        </Button>
      </div>
    </div>
  );
}
