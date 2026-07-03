import Button from "../common/Button";
import FormInput from "../common/FormInput";
import { useState } from "react";
import { useCreateRoom as useCreateRoom } from "@/hooks/use-room";
import { toast } from "sonner";

export default function RoomCreateModalContent({
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
    <div className="flex h-full min-h-0 flex-col p-4">
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
        <FormInput
          disabled={isPending}
          label="채팅방 이름"
          placeholder="예: 스터디 모임 방"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          autoFocus
        />

        <div className="flex justify-between gap-2">
          <Button onClick={onClose} variant="outline" className="w-full">
            취소
          </Button>
          <Button
            className="w-full"
            onClick={handleCreate}
            disabled={!roomName.trim() || isPending}
          >
            생성
          </Button>
        </div>
      </div>
    </div>
  );
}
