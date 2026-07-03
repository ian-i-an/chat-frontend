import FormInput from "@/components/common/FormInput";
import Button from "@/components/common/Button";
import { type SubmitEventHandler, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSignUp } from "@/hooks/use-auth";
import { toast } from "sonner";
import AuthHeader from "@/components/auth/AuthHeader";

export default function SignUpPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loginId = searchParams.get("loginId");

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp();

  useEffect(() => {
    if (!loginId) {
      toast.error("잘못된 접근입니다. 처음부터 다시 진행해주세요.");
      navigate(-1);
    }
  }, [loginId, navigate]);

  const handleSignUpComplete: SubmitEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();

    if (!loginId || !password || password !== passwordCheck) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    signUp(
      { loginId, password },
      {
        onSuccess: () => {
          toast.success("회원가입이 완료되었습니다!");
          navigate("/sign-in", { replace: true });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className="flex flex-col">
      <AuthHeader
        title="비밀번호 설정"
        description="안전한 비밀번호를 입력해주세요"
      />

      <form
        onSubmit={handleSignUpComplete}
        className="mt-6 mb-3 flex flex-col gap-3"
      >
        <FormInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"

          type="password"
          autoFocus
        />
        <FormInput
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          placeholder="비밀번호 확인"

          type="password"
        />
        <Button disabled={isSignUpPending} className="mt-6" type="submit">
          가입 완료
        </Button>
      </form>

      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer text-center text-xs font-medium text-gray-400 transition-colors hover:text-gray-600"
      >
        이전 단계로 돌아가기
      </button>
    </div>
  );
}
