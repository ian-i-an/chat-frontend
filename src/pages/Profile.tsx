import { AlertCircle } from "lucide-react";
import defaultProfile from "@/assets/default-profile.png";
import { useFetchMyProfile } from "@/hooks/use-auth";
import { useDeleteAccount, useUpdateNickname } from "@/hooks/use-user";
import NicknameEditor from "@/components/profile/NicknameEditor";

export default function Profile() {
  const { data: myProfile } = useFetchMyProfile();
  const { mutateAsync: updateNickname, isPending: isUpdatingNickname } =
    useUpdateNickname();
  const { mutate: deleteAccount } = useDeleteAccount();

  const handleUpdateNickname = async (nickname: string) => {
    await updateNickname({ newNickname: nickname });
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
      <div className="flex flex-col items-center gap-3 border-b border-gray-100 pb-4">
        <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-md ring-1 ring-gray-100">
          <img
            src={defaultProfile}
            alt="프로필 이미지"
            className="h-full w-full object-cover"
          />
        </div>

        <NicknameEditor
          nickname={myProfile?.nickname}
          isUpdating={isUpdatingNickname}
          onUpdateNickname={handleUpdateNickname}
        />
      </div>

      <div className="mb-7 flex flex-col gap-3">
        <h2 className="px-1 pt-8 pb-4 text-sm font-semibold text-gray-500">
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
