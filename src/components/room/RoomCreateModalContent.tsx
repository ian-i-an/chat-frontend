import Button from "../common/Button";
import FormInput from "../common/FormInput";
import { type SubmitEvent, useState } from "react";
import { useCreateRoom as useCreateRoom } from "@/hooks/use-room";
import { toast } from "sonner";

export default function RoomCreateModalContent({
  onClose,
}: {
  onClose: () => void;
}) {
  const [roomName, setRoomName] = useState("");
  const { mutate: createRoom, isPending } = useCreateRoom();

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!roomName.trim()) return;

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
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col gap-6 overflow-y-auto"
      >
        <FormInput
          disabled={isPending}
          placeholder="채팅방 이름"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          autoFocus
        />

        <div className="flex justify-between gap-2">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            취소
          </Button>
          <Button
            type="submit"
            className="w-full"

            disabled={!roomName.trim() || isPending}
          >
            생성
          </Button>
        </div>
      </form>
    </div>
  );
}
