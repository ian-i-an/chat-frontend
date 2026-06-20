import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { useNavigate } from "react-router-dom";

import { useState, type SubmitEventHandler } from "react";
import { useSignIn } from "@/hooks/useAuth";
import { toast } from "sonner";

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

          navigate("/chat-rooms", { replace: true });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className="flex flex-col">
      <div className="text-center">
        <h1 className="text-2xl font-black tracking-tight text-blue-500">
          로그인
        </h1>
        <p className="text-sm font-medium text-gray-400">
          지금 바로 나만의 익명 채팅방 만들러가기
        </p>
      </div>

      <form onSubmit={handleLogin} className="mt-6 mb-3 flex flex-col gap-3">
        <FormInput
          label={"아이디"}
          placeholder={"아이디를 입력해주세요"}
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          autoFocus
        />
        <FormInput
          label={"비밀번호"}
          placeholder={"비밀번호를 입력해주세요"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
        />
        <Button
          disabled={isSignIngPending}
          type="submit"
          className="mt-6"
          text={"로그인"}
        />
      </form>

      <div className="text-center text-xs font-medium text-gray-400">
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
