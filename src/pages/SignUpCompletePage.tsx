import AuthHeader from "@/components/auth/AuthHeader";
import SignUpAgreementDialog, {
  type AgreementType,
} from "@/components/auth/SignUpAgreementDialog";
import Button from "@/components/common/Button";
import { useSignUp } from "@/backend/user/user.queries";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignUpCompletePage() {
  const navigate = useNavigate();
  const { mutateAsync: signUp, isPending } = useSignUp();
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [hasAgreedToPrivacy, setHasAgreedToPrivacy] = useState(false);
  const [openAgreement, setOpenAgreement] =
    useState<AgreementType | null>(null);

  const hasAgreedToAll = hasAgreedToTerms && hasAgreedToPrivacy;

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!hasAgreedToAll) return;

    try {
      await signUp();
      navigate("/rooms", { replace: true });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col">
      <AuthHeader
        title="회원가입 완료하기"
        description="첨벙을 시작하기 전에 마지막으로 확인해주세요."
      />

      <div className="mt-7 flex items-center gap-3 border-y border-border py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fee500] text-[#191919]">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">카카오 계정 연결 완료</p>
          <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
            안전하게 계정을 확인했어요.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col">
        <div className="border-y border-border py-1">
          <div className="flex min-h-12 items-center gap-3 px-2">
            <input
              id="terms-agreement"
              type="checkbox"
              checked={hasAgreedToTerms}
              onChange={(event) => setHasAgreedToTerms(event.target.checked)}
              className="h-4 w-4 shrink-0 cursor-pointer accent-blue-500"
            />
            <label
              htmlFor="terms-agreement"
              className="min-w-0 flex-1 cursor-pointer text-sm font-medium text-gray-700"
            >
              <span className="mr-1 text-primary">[필수]</span>
              서비스 이용약관 동의
            </label>
            <button
              type="button"
              onClick={() => setOpenAgreement("terms")}
              className="flex shrink-0 cursor-pointer items-center gap-0.5 p-2 text-xs font-medium text-subtle-foreground transition-colors hover:text-gray-700"
            >
              보기
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex min-h-12 items-center gap-3 border-t border-gray-100 px-2">
            <input
              id="privacy-agreement"
              type="checkbox"
              checked={hasAgreedToPrivacy}
              onChange={(event) => setHasAgreedToPrivacy(event.target.checked)}
              className="h-4 w-4 shrink-0 cursor-pointer accent-blue-500"
            />
            <label
              htmlFor="privacy-agreement"
              className="min-w-0 flex-1 cursor-pointer text-sm font-medium text-gray-700"
            >
              <span className="mr-1 text-primary">[필수]</span>
              개인정보 수집·이용 동의
            </label>
            <button
              type="button"
              onClick={() => setOpenAgreement("privacy")}
              className="flex shrink-0 cursor-pointer items-center gap-0.5 p-2 text-xs font-medium text-subtle-foreground transition-colors hover:text-gray-700"
            >
              보기
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

        <Button
          type="submit"
          disabled={!hasAgreedToAll || isPending}
          className="mt-7 w-full"
        >
          {isPending ? "가입 중..." : "동의하고 가입하기"}
        </Button>
      </form>

      {openAgreement && (
        <SignUpAgreementDialog
          type={openAgreement}
          onClose={() => setOpenAgreement(null)}
        />
      )}
    </div>
  );
}
