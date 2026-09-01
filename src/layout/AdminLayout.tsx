import { Activity, ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-gray-50">
      <header className="shrink-0 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Link to="/admin" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm shadow-blue-200">
              <Activity className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-base font-black text-gray-950">
                첨벙 관리자
              </span>
              <span className="block text-xs font-medium text-gray-400">
                운영 관리
              </span>
            </span>
          </Link>

          <Link
            to="/"
            aria-label="서비스 홈으로 돌아가기"
            title="서비스 홈으로 돌아가기"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
