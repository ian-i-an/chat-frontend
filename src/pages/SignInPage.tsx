import AuthHeader from "@/components/auth/AuthHeader";

const API_URL = import.meta.env.VITE_API_URL;

export default function SignInPage() {
  return (
    <div className="flex flex-col">
      <AuthHeader
        title="첨벙 시작하기"
        description="카카오 계정으로 간편하게 시작해보세요."
      />

      <a
        href={`${API_URL}/oauth2/authorization/kakao`}
        className="mt-8 flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#fee500] px-4 text-sm font-bold text-[#191919] transition-colors hover:bg-[#f5dc00] active:bg-[#ead300]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-current"
        >
          <path d="M12 3C6.48 3 2 6.55 2 10.93c0 2.84 1.88 5.33 4.7 6.73l-.96 3.52a.5.5 0 0 0 .77.54l4.15-2.75c.44.05.89.08 1.34.08 5.52 0 10-3.55 10-7.93S17.52 3 12 3Z" />
        </svg>
        <span>카카오로 시작하기</span>
      </a>
    </div>
  );
}
