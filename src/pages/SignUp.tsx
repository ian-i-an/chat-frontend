import { useNavigate } from "react-router-dom";

import FormInput from "@/components/common/FormInput";
import Button from "@/components/common/Button";
import { type SubmitEventHandler, useState } from "react";
import { useCheckId } from "@/hooks/useAuth";
import { toast } from "sonner";
import AuthHeader from "@/components/auth/AuthHeader";

export default function SignUp() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");

  const { mutate: checkId, isPending: isCheckIdPending } = useCheckId();

  const handleNextSignUpStep: SubmitEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();

    if (!loginId.trim()) {
      toast.error("사용할 아이디를 입력해주세요.");
      return;
    }

    checkId(
      { loginId },
      {
        onSuccess: () => {
          navigate(`/sign-up/password?loginId=${loginId}`, { replace: true });
        },
        onError: (error) => {
          toast.error(error.message);
          setLoginId("");
        },
      },
    );
  };

  return (
    <div className="flex flex-col">
      <AuthHeader title="회원가입" description="사용할 아이디를 정해주세요" />

      <form
        onSubmit={handleNextSignUpStep}
        className="mt-6 mb-3 flex flex-col gap-3"
      >
        <FormInput
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          label="아이디"
          placeholder="사용할 아이디를 입력해주세요"
          autoFocus
        />
        <Button disabled={isCheckIdPending} type="submit" className="mt-6">
          다음
        </Button>
      </form>

      <div className="text-center text-xs font-medium text-gray-400">
        아이디가 있으신가요?{" "}
        <span
          onClick={() => {
            navigate("/sign-in");
          }}
          className="cursor-pointer font-semibold text-blue-500 transition-colors hover:text-blue-400 hover:underline"
        >
          로그인
        </span>
      </div>
    </div>
  );
}
