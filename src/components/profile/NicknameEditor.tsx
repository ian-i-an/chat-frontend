import { Check, Edit2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import IconButton from "../common/IconButton";

interface NicknameEditorProps {
  nickname?: string;
  isUpdating: boolean;
  onUpdateNickname: (nickname: string) => Promise<void>;
}

export default function NicknameEditor({
  nickname,
  isUpdating,
  onUpdateNickname,
}: NicknameEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftNickname, setDraftNickname] = useState("");

  const startEditing = () => {
    setDraftNickname(nickname ?? "");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraftNickname(nickname ?? "");
    setIsEditing(false);
  };

  const submitNickname = async () => {
    const nextNickname = draftNickname.trim();

    if (!nextNickname) return;

    if (nextNickname === nickname) {
      setIsEditing(false);
      return;
    }

    try {
      await onUpdateNickname(nextNickname);
      setIsEditing(false);
      toast.success("이름이 변경되었습니다.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "이름 변경에 실패했습니다.";

      toast.error(message);
    }
  };

  if (isEditing) {
    return (
      <form
        className="flex h-10 w-full items-center justify-center gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          submitNickname();
        }}
      >
        <input
          type="text"
          value={draftNickname}
          onChange={(event) => setDraftNickname(event.target.value)}
          disabled={isUpdating}
          autoFocus
          className="rounded-xl bg-white px-3 py-1.5 text-center text-lg font-semibold tracking-tight text-gray-800 outline-none focus:ring-2 focus:ring-blue-200 disabled:text-gray-400"
        />
        <IconButton
          type="submit"
          variant="primary"
          disabled={!draftNickname.trim() || isUpdating}
        >
          <Check className="h-4 w-4" />
        </IconButton>
        <IconButton
          type="button"
          onClick={cancelEditing}
          variant="secondary"
          disabled={isUpdating}
        >
          <X className="h-4 w-4" />
        </IconButton>
      </form>
    );
  }

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <div className="text-lg font-semibold tracking-tight text-gray-800">
        {nickname ?? ""}
      </div>
      <IconButton type="button" onClick={startEditing} disabled={!nickname}>
        <Edit2 className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
