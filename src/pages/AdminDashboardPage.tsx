import type { ReactNode } from "react";
import {
  Activity,
  ArrowLeft,
  Eye,
  Flag,
  MessageCircle,
  PlusCircle,
  UserPlus,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const weeklyUsers = [
  { date: "8월 10일", newUsers: 18, activeUsers: 312, visitors: 482 },
  { date: "8월 11일", newUsers: 20, activeUsers: 338, visitors: 519 },
  { date: "8월 12일", newUsers: 16, activeUsers: 326, visitors: 501 },
  { date: "8월 13일", newUsers: 25, activeUsers: 401, visitors: 612 },
  { date: "8월 14일", newUsers: 19, activeUsers: 386, visitors: 586 },
  { date: "8월 15일", newUsers: 28, activeUsers: 445, visitors: 673 },
  { date: "오늘", newUsers: 22, activeUsers: 421, visitors: 638 },
];

interface StatCardProps {
  label: string;
  value: string;
  description: string;
  icon: ReactNode;
  iconClassName: string;
}

function StatCard({
  label,
  value,
  description,
  icon,
  iconClassName,
}: StatCardProps) {
  return (
    <article className="flex min-h-36 flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray-500">{label}</p>
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
        >
          {icon}
        </div>
      </div>
      <p className="mt-4 text-3xl font-black text-gray-950">{value}</p>
      <p className="mt-auto pt-2 text-xs leading-5 text-gray-400">
        {description}
      </p>
    </article>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-gray-50">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm shadow-blue-200">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-black text-gray-950">첨벙 관리자</p>
              <p className="text-xs font-medium text-gray-400">운영 현황</p>
            </div>
          </div>

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

      <main className="mx-auto w-full max-w-6xl px-6 py-9">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-gray-950">운영 현황</h1>
            <p className="mt-1 text-sm font-medium text-gray-500">
              2026년 8월 16일 기준
            </p>
          </div>
          <span className="text-xs font-semibold text-gray-400">
            데모 데이터
          </span>
        </div>

        <section
          aria-label="주요 운영 지표"
          className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3"
        >
          <StatCard
            label="전체 회원"
            value="1,284"
            description="어제보다 18명 증가"
            icon={<Users className="h-5 w-5" />}
            iconClassName="bg-blue-50 text-blue-500"
          />
          <StatCard
            label="전체 채팅방"
            value="3,917"
            description="현재 운영 중 3,846개"
            icon={<MessageCircle className="h-5 w-5" />}
            iconClassName="bg-violet-50 text-violet-500"
          />
          <StatCard
            label="오늘 생성된 방"
            value="42"
            description="어제 같은 시간보다 6개 증가"
            icon={<PlusCircle className="h-5 w-5" />}
            iconClassName="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            label="오늘 가입자"
            value="22"
            description="최근 7일 신규 가입자 148명"
            icon={<UserPlus className="h-5 w-5" />}
            iconClassName="bg-cyan-50 text-cyan-600"
          />
          <StatCard
            label="신고 대기"
            value="7"
            description="24시간 이상 대기 1건"
            icon={<Flag className="h-5 w-5" />}
            iconClassName="bg-red-50 text-red-500"
          />
          <StatCard
            label="오늘 방문자"
            value="638"
            description="어제보다 12.4% 증가"
            icon={<Eye className="h-5 w-5" />}
            iconClassName="bg-amber-50 text-amber-600"
          />
        </section>

        <section className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-gray-200 px-5 py-5">
            <div>
              <h2 className="text-base font-bold text-gray-950">
                최근 7일 사용자 현황
              </h2>
              <p className="mt-1 text-xs font-medium text-gray-400">
                가입자, 활동 사용자, 방문자 기준
              </p>
            </div>
            <div className="flex gap-5 text-right">
              <div>
                <p className="text-xs font-medium text-gray-400">7일 신규</p>
                <p className="mt-1 text-sm font-bold text-gray-900">148명</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400">오늘 활동</p>
                <p className="mt-1 text-sm font-bold text-gray-900">421명</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-150 border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500">
                  <th className="px-5 py-3 text-left">날짜</th>
                  <th className="px-5 py-3 text-right">신규 가입자</th>
                  <th className="px-5 py-3 text-right">활동 사용자</th>
                  <th className="px-5 py-3 text-right">방문자</th>
                </tr>
              </thead>
              <tbody>
                {weeklyUsers.map((day) => (
                  <tr
                    key={day.date}
                    className={`border-b border-gray-100 last:border-b-0 ${
                      day.date === "오늘" ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <td className="px-5 py-3.5 font-semibold text-gray-700">
                      {day.date}
                    </td>
                    <td className="px-5 py-3.5 text-right font-medium text-gray-600">
                      {day.newUsers.toLocaleString()}명
                    </td>
                    <td className="px-5 py-3.5 text-right font-medium text-gray-600">
                      {day.activeUsers.toLocaleString()}명
                    </td>
                    <td className="px-5 py-3.5 text-right font-medium text-gray-600">
                      {day.visitors.toLocaleString()}명
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
