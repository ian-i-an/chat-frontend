import { useState } from "react";
import { Edit2, Check, X, AlertCircle } from "lucide-react";
import defaultProfile from "@/assets/default-profile.png";
import { useFetchMyProfile } from "@/hooks/useAuth";
import { useDeleteAccount, useUpdateNickname } from "@/hooks/useUser";
import { toast } from "sonner";
import IconButton from "@/components/common/IconButton";

export default function Profile() {
  const { data: myProfile } = useFetchMyProfile();
  const { mutate: updateNickname } = useUpdateNickname();
  const { mutate: deleteAccount } = useDeleteAccount();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");

  const handleEditStart = () => {
    setEditName(myProfile?.nickname || "");
    setIsEditing(true);
  };

  const handleEditSave = () => {
    if (!editName.trim()) return;
    updateNickname(
      { newNickname: editName },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("이름이 변경되었습니다.");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const handleDeleteAccount = () => {
    const isConfirmed = window.confirm(
      "정말로 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.",
    );
    if (isConfirmed) {
      deleteAccount();
    }
  };

  return (
    <div className="flex flex-1 flex-col px-6 py-10">
      <div className="flex flex-col  items-center gap-3 border-b border-gray-100 pb-4">
        <div className="h-28 w-28 overflow-hidden rounded-full border-4 ring-1 ring-gray-100 border-white  shadow-md">
          <img
            src={defaultProfile}
            alt="프로필 이미지"
            className="h-full w-full object-cover"
          />
        </div>

        {isEditing ? (
          <div className="flex h-10 w-full items-center justify-center gap-2">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
              className="rounded-xl bg-white px-3 py-1.5 text-center text-lg font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              onClick={handleEditSave}
              className=" flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-400"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
            >
              <X className="h-4 w-4" />
            </button>{" "}
          </div>
        ) : (
          <div className="flex h-10 w-full items-center justify-center gap-2">
            <div className="text-xl tracking-tight font-bold text-gray-800">
              {myProfile?.nickname || ""}
            </div>

            <IconButton onClick={handleEditStart}>
              <Edit2 className="h-4 w-4" />
            </IconButton>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className=" px-1 pt-8 pb-4 text-sm font-semibold text-gray-500">
          계정 설정
        </h2>

        <button className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100">
          <span>비밀번호 변경</span>
        </button>
      </div>

      <div className="mt-auto rounded-2xl border border-red-100 bg-red-50/50 p-5">
        <div className="mb-4 flex items-center gap-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <h2 className="font-bold">Danger Zone</h2>
        </div>
        <p className="mb-4 text-sm text-red-600/80">
          계정을 삭제하면 모든 채팅 내역과 프로필 정보가 영구적으로 삭제되며
          복구할 수 없습니다.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="w-full rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-600 transition-colors hover:bg-red-200"
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
}
