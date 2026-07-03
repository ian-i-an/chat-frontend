import { useState, type SubmitEvent } from "react";
import Dialog from "../common/Dialog";
import Button from "../common/Button";
import { toast } from "sonner";
import PasswordInput from "../common/PasswordInput";
// import { Eye, EyeOff } from "lucide-react";

export default function PasswordChangeDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCurrentPasswordEmpty = !currentPassword.trim();
  const isNewPasswordEmpty = !newPassword.trim();
  const isNewPasswordConfirmEmpty = !newPasswordConfirm.trim();

  const isPasswordMismatch =
    !!newPasswordConfirm && newPassword !== newPasswordConfirm;

  const canSubmit =
    !isCurrentPasswordEmpty &&
    !isNewPasswordEmpty &&
    !isNewPasswordConfirmEmpty &&
    !isPasswordMismatch;

  const closeDialog = () => {
    setIsOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");
    setIsSubmitted(false);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!canSubmit) {
      toast.error("비밀번호 입력값을 확인해주세요.");
      return;
    }

    // TODO: 비밀번호 변경 API 연결
    toast.success("비밀번호 변경 요청을 보낼 수 있는 상태입니다.");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100"
      >
        비밀번호 변경
      </button>

      {isOpen && (
        <Dialog title="비밀번호 변경" onClose={closeDialog}>
          <div className="flex h-full min-h-0 flex-col p-4">
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col gap-6 overflow-y-auto"
            >
              <div className="flex flex-col gap-2">
                <PasswordInput
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder="현재 비밀번호"
                  autoFocus
                />
                {isSubmitted && isCurrentPasswordEmpty && (
                  <p className="px-1 text-xs font-medium text-red-500">
                    현재 비밀번호를 입력해주세요.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <PasswordInput
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="새로운 비밀번호"
                />
                {isSubmitted && isNewPasswordEmpty && (
                  <p className="px-1 text-xs font-medium text-red-500">
                    새로운 비밀번호를 입력해주세요.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <PasswordInput
                  value={newPasswordConfirm}
                  onChange={(event) =>
                    setNewPasswordConfirm(event.target.value)
                  }
                  placeholder="새로운 비밀번호 확인"
                />
                {isSubmitted && isNewPasswordConfirmEmpty && (
                  <p className="px-1 text-xs font-medium text-red-500">
                    새로운 비밀번호 확인을 입력해주세요.
                  </p>
                )}
                {isPasswordMismatch && (
                  <p className="px-1 text-xs font-medium text-red-500">
                    새로운 비밀번호가 일치하지 않습니다.
                  </p>
                )}
              </div>

              <div className="flex justify-between gap-2">
                <Button
                  onClick={closeDialog}
                  type="button"
                  variant="outline"
                  className="w-full"
                >
                  취소
                </Button>
                <Button type="submit" className="w-full">
                  변경
                </Button>
              </div>
            </form>
          </div>
        </Dialog>
      )}
    </>
  );
}
