import { useSignOutAdmin } from "@/domains/hooks/use-admin-auth";
import { Activity, ArrowLeft, LoaderCircle, LogOut } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const { mutate: signOutAdmin, isPending } = useSignOutAdmin();

  return (
    <div className="app-layout">
      <header className="border-border bg-surface/80 shrink-0 border-b backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Link to="/admin" className="flex items-center gap-3">
            <span className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-sm shadow-blue-200">
              <Activity className="h-5 w-5" />
            </span>
            <span>
              <span className="text-foreground block text-base font-black">
                첨벙 관리자
              </span>
              <span className="text-subtle-foreground block text-xs font-medium">
                운영 관리
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => signOutAdmin()}
              disabled={isPending}
              aria-label="관리자 로그아웃"
              title="관리자 로그아웃"
              className="text-muted-foreground flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <LogOut className="h-5 w-5" />
              )}
            </button>
            <Link
              to="/"
              aria-label="서비스 홈으로 돌아가기"
              title="서비스 홈으로 돌아가기"
              className="text-muted-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
