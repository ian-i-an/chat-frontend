import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";
import { useNavigate } from "react-router-dom";
import { useState, type SubmitEventHandler } from "react";
import { useSignIn } from "@/hooks/use-auth";
import { toast } from "sonner";
import AuthHeader from "@/components/auth/AuthHeader";

const API_URL = import.meta.env.VITE_API_URL;

export default function SignInPage() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signIn, isPending: isSignIngPending } = useSignIn();

  const handleLogin: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    signIn(
      { loginId, password },
      {
        onSuccess: () => {
          toast.success("로그인에 성공하였습니다.");

          navigate("/rooms", { replace: true });
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
        title="로그인"
        description="지금 바로 나만의 익명 채팅방 만들러가기"
      />

      <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-3">
        <FormInput
          placeholder={"아이디"}

          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          autoFocus
        />
        <FormInput
          placeholder={"비밀번호"}

          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
        />
        <Button disabled={isSignIngPending} type="submit" className="mt-6">
          로그인
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-medium text-gray-400">또는</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <a
        href={`${API_URL}/oauth2/authorization/kakao`}
        className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#fee500] px-4 text-sm font-bold text-[#191919] transition-colors hover:bg-[#f5dc00] active:bg-[#ead300]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-current"
        >
          <path d="M12 3C6.48 3 2 6.55 2 10.93c0 2.84 1.88 5.33 4.7 6.73l-.96 3.52a.5.5 0 0 0 .77.54l4.15-2.75c.44.05.89.08 1.34.08 5.52 0 10-3.55 10-7.93S17.52 3 12 3Z" />
        </svg>
        <span>카카오로 로그인</span>
      </a>

      <div className="mt-5 text-center text-xs font-medium text-gray-400">
        아직 가입하지 않으셨나요?{" "}
        <span
          onClick={() => {
            navigate("/sign-up");
          }}
          className="cursor-pointer font-semibold text-blue-500 transition-colors hover:text-blue-400 hover:underline"
        >
          회원가입
        </span>
      </div>
    </div>
  );
}
