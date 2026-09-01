import AuthHeader from "@/components/auth/AuthHeader";
import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";
import { useSignInAdmin } from "@/hooks/use-admin-auth";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSignInPage() {
  const navigate = useNavigate();
  const { mutate: signIn, isPending, error, reset } = useSignInAdmin();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValid = !!loginId.trim() && !!password;

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!isValid) return;

    signIn(
      { loginId: loginId.trim(), password },
      {
        onSuccess: () => {
          navigate("/admin", { replace: true });
        },
      },
    );
  };

  return (
    <div className="flex flex-col">
      <AuthHeader
        title="관리자 로그인"
        description="운영 계정으로 첨벙 관리 페이지에 접속합니다."
      />

      <div className="mt-7 flex items-center gap-3 border-y border-border py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold text-gray-900">관리자 전용</p>
          <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
            발급된 운영 계정만 로그인할 수 있습니다.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-bold text-gray-700">
          로그인 아이디
          <FormInput
            value={loginId}
            onChange={(event) => {
              setLoginId(event.target.value);
              reset();
            }}
            autoComplete="username"
            placeholder="관리자 아이디"
            disabled={isPending}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold text-gray-700">
          비밀번호
          <FormInput
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              reset();
            }}
            autoComplete="current-password"
            placeholder="비밀번호"
            disabled={isPending}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                title={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-subtle-foreground hover:bg-gray-100 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
          />
        </label>

        {error && (
          <p className="rounded-lg bg-danger-soft px-3 py-2.5 text-sm font-semibold text-red-600">
            {error.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={!isValid || isPending}
          className="mt-3 w-full"
        >
          {isPending ? "로그인 중..." : "관리자 로그인"}
        </Button>
      </form>
    </div>
  );
}
