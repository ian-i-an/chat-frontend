import Fallback from "@/components/common/Fallback";
import Loader from "@/components/common/Loader";
import {
  useGetQuizStatistics,
  useGetRoomStatistics,
  useGetUserStatistics,
} from "@/queries/admin-statistics.queries";
import { useGetQuizTemplates } from "@/queries/admin-quiz-template.queries";
import {
  BookOpenCheck,
  Brain,
  ChevronRight,
  LoaderCircle,
  MessageCircle,
  Pencil,
  Plus,
  PlusCircle,
  RotateCcw,
  TriangleAlert,
  UserPlus,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link, Navigate } from "react-router-dom";

interface StatCardProps {
  label: string;
  value: number;
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
    <article className="flex min-h-36 flex-col rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
        >
          {icon}
        </span>
      </div>
      <p className="mt-4 text-3xl font-black text-foreground">
        {value.toLocaleString()}
      </p>
      <p className="mt-auto pt-2 text-xs leading-5 text-subtle-foreground">
        {description}
      </p>
    </article>
  );
}

export default function AdminDashboardPage() {
  const userStatisticsQuery = useGetUserStatistics();
  const roomStatisticsQuery = useGetRoomStatistics();
  const quizStatisticsQuery = useGetQuizStatistics();
  const templateQuery = useGetQuizTemplates();

  const isLoading =
    userStatisticsQuery.isLoading ||
    roomStatisticsQuery.isLoading ||
    quizStatisticsQuery.isLoading;

  const isError =
    userStatisticsQuery.isError ||
    roomStatisticsQuery.isError ||
    quizStatisticsQuery.isError;

  const retry = () => {
    void Promise.all([
      userStatisticsQuery.refetch(),
      roomStatisticsQuery.refetch(),
      quizStatisticsQuery.refetch(),
    ]);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (
    isError ||
    !userStatisticsQuery.data ||
    !roomStatisticsQuery.data ||
    !quizStatisticsQuery.data
  ) {
    return <Fallback onRetry={retry} />;
  }

  if (templateQuery.isError) {
    const status =
      templateQuery.error instanceof Error
        ? templateQuery.error.cause
        : undefined;

    if (status === 401 || status === 403) {
      return <Navigate to="/admin/sign-in" replace />;
    }
  }

  const userStatistics = userStatisticsQuery.data;
  const roomStatistics = roomStatisticsQuery.data;
  const quizStatistics = quizStatisticsQuery.data;
  const today = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <main className="mx-auto w-full max-w-6xl min-w-240 px-6 py-9">
        <div>
          <h1 className="text-2xl font-black text-foreground">운영 현황</h1>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {today} 기준
          </p>
        </div>

        <section
          aria-label="주요 운영 지표"
          className="mt-6 grid grid-cols-3 gap-3"
        >
          <StatCard
            label="전체 회원"
            value={userStatistics.totalCount}
            description="현재 가입된 전체 회원"
            icon={<Users className="h-5 w-5" />}
            iconClassName="bg-primary-soft text-primary-strong"
          />
          <StatCard
            label="오늘 가입자"
            value={userStatistics.todayRegisteredCount}
            description="오늘 새로 가입한 회원"
            icon={<UserPlus className="h-5 w-5" />}
            iconClassName="bg-cyan-50 text-cyan-600"
          />
          <StatCard
            label="전체 채팅방"
            value={roomStatistics.totalCount}
            description="현재 생성된 전체 채팅방"
            icon={<MessageCircle className="h-5 w-5" />}
            iconClassName="bg-violet-50 text-violet-600"
          />
          <StatCard
            label="오늘 생성된 방"
            value={roomStatistics.todayCreatedCount}
            description="오늘 새로 생성된 채팅방"
            icon={<PlusCircle className="h-5 w-5" />}
            iconClassName="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            label="전체 퀴즈"
            value={quizStatistics.totalCount}
            description="회원들이 만든 전체 퀴즈"
            icon={<Brain className="h-5 w-5" />}
            iconClassName="bg-rose-50 text-rose-600"
          />
          <StatCard
            label="오늘 생성된 퀴즈"
            value={quizStatistics.todayCreatedCount}
            description="오늘 새로 만들어진 퀴즈"
            icon={<PlusCircle className="h-5 w-5" />}
            iconClassName="bg-amber-50 text-amber-600"
          />
        </section>

        <section className="mt-8" aria-labelledby="quiz-template-title">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2
                id="quiz-template-title"
                className="text-base font-black text-foreground"
              >
                퀴즈 템플릿
              </h2>
              <p className="mt-1 text-xs font-medium text-subtle-foreground">
                템플릿을 선택하면 질문과 선택지를 수정할 수 있습니다.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {!templateQuery.isLoading && !templateQuery.isError && (
                <span className="text-sm font-bold text-subtle-foreground">
                  {templateQuery.data?.length ?? 0}개
                </span>
              )}
              <Link
                to="/admin/quiz-templates/new"
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-sm shadow-blue-200 transition-colors hover:bg-primary-hover"
              >
                <Plus className="h-4 w-4" />
                퀴즈 템플릿 추가
              </Link>
            </div>
          </div>

          {templateQuery.isLoading && (
            <div className="mt-4 overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-20 animate-pulse items-center gap-4 border-b border-gray-100 px-5 last:border-b-0"
                >
                  <div className="h-9 w-9 rounded-lg bg-gray-100" />
                  <div className="flex-1">
                    <div className="h-4 w-1/4 rounded bg-gray-100" />
                    <div className="mt-2 h-3 w-1/2 rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {templateQuery.isError && (
            <div className="mt-4 flex min-h-44 flex-col items-center justify-center gap-3 rounded-lg border border-border bg-surface text-center shadow-sm">
              <TriangleAlert className="h-6 w-6 text-subtle-foreground" />
              <p className="text-sm font-semibold text-muted-foreground">
                퀴즈 템플릿을 불러오지 못했습니다.
              </p>
              <button
                type="button"
                onClick={() => templateQuery.refetch()}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-hover"
              >
                <RotateCcw className="h-4 w-4" />
                다시 시도하기
              </button>
            </div>
          )}

          {!templateQuery.isLoading &&
            !templateQuery.isError &&
            templateQuery.data?.length === 0 && (
              <div className="mt-4 flex min-h-44 flex-col items-center justify-center gap-3 rounded-lg border border-border bg-surface text-center shadow-sm">
                <BookOpenCheck className="h-7 w-7 text-gray-300" />
                <p className="text-sm font-semibold text-muted-foreground">
                  등록된 퀴즈 템플릿이 없습니다.
                </p>
              </div>
            )}

          {!templateQuery.isLoading &&
            !templateQuery.isError &&
            templateQuery.data &&
            templateQuery.data.length > 0 && (
              <div className="mt-4 overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
                {templateQuery.data.map((template) => (
                  <Link
                    key={template.quizTemplateId}
                    to={`/admin/quiz-templates/${template.quizTemplateId}/edit`}
                    className="group flex min-h-20 items-center gap-4 border-b border-gray-100 px-5 transition-colors last:border-b-0 hover:bg-primary-soft/40"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                      <BookOpenCheck className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-black text-foreground">
                        {template.title}
                      </span>
                      <span className="mt-1 block truncate text-xs font-medium text-muted-foreground">
                        {template.description || "설명이 없는 템플릿"}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 text-xs font-bold text-subtle-foreground transition-colors group-hover:text-primary">
                      <Pencil className="h-3.5 w-3.5" />
                      수정
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            )}

          {templateQuery.hasNextPage && (
            <button
              type="button"
              onClick={() => templateQuery.fetchNextPage()}
              disabled={templateQuery.isFetchingNextPage}
              className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-surface py-3 text-sm font-bold text-gray-600 transition-colors hover:border-blue-300 hover:text-primary disabled:cursor-not-allowed disabled:text-gray-300"
            >
              {templateQuery.isFetchingNextPage ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              템플릿 더 보기
            </button>
          )}
        </section>
      </main>
    </div>
  );
}
