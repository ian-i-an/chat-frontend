import Fallback from "@/components/common/Fallback";
import Loader from "@/components/common/Loader";
import {
  useDelete as useDeleteQuizResult,
  useRanking,
} from "@/queries/quiz-result.queries";
import { useGetQuiz, useGetQuizzesByUser } from "@/queries/quiz.queries";
import type { GradeResultResponse } from "@/domain/quiz.type";
import { useGetMe } from "@/queries/user.queries";
import {
  Crown,
  Home,
  LoaderCircle,
  Medal,
  RotateCcw,
  Trash2,
  Trophy,
  Users,
} from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function QuizResultPage() {
  const { code = "" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const quizQuery = useGetQuiz(code);
  const rankingQuery = useRanking(code);
  const profileQuery = useGetMe();
  const myQuizzesQuery = useGetQuizzesByUser(
    !!profileQuery.data && !profileQuery.isError,
  );
  const deleteResultMutation = useDeleteQuizResult();

  const quizResultIdParam = searchParams.get("quizResultId");
  const quizResultId = quizResultIdParam ? Number(quizResultIdParam) : null;
  const rankings = rankingQuery.data ?? [];
  const currentResult = quizResultId !== null && Number.isFinite(quizResultId)
    ? rankings.find((result) => result.quizResultId === quizResultId)
    : undefined;
  const isMyQuiz =
    myQuizzesQuery.data?.some((quiz) => quiz.code === code) ?? false;
  const averageScore = rankings.length
    ? Math.round(
        rankings.reduce((total, result) => total + result.score, 0) /
          rankings.length,
      )
    : 0;

  const retry = () => {
    void Promise.all([quizQuery.refetch(), rankingQuery.refetch()]);
  };

  const handleDeleteResult = async (result: GradeResultResponse) => {
    const isConfirmed = window.confirm(
      `${result.nickname}님의 결과를 삭제하시겠습니까?`,
    );

    if (!isConfirmed) return;

    try {
      await deleteResultMutation.mutateAsync({
        code,
        quizResultId: result.quizResultId,
      });

      if (result.quizResultId === currentResult?.quizResultId) {
        setSearchParams({}, { replace: true });
      }

      toast.success("결과를 삭제했습니다.");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  if (quizQuery.isLoading || rankingQuery.isLoading) {
    return <Loader fullPage />;
  }

  if (
    quizQuery.isError ||
    rankingQuery.isError ||
    !quizQuery.data ||
    !rankingQuery.data
  ) {
    return <Fallback onRetry={retry} />;
  }

  const quiz = quizQuery.data;

  return (
    <div className="app-layout">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
        <Link to="/" className="text-primary text-lg font-black">
          첨벙
        </Link>
        <span className="text-muted-foreground text-sm font-bold">
          퀴즈 결과
        </span>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 pb-12">
        <main className="mx-auto w-full max-w-xl">
          <section className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-500">
              {currentResult ? (
                <Trophy className="h-7 w-7" />
              ) : (
                <Users className="h-7 w-7" />
              )}
            </div>
            <p className="text-primary mt-4 text-sm font-bold">
              {currentResult
                ? `${currentResult.nickname}님의 결과`
                : "참여 현황"}
            </p>
            <h1 className="text-foreground mt-1 text-xl font-black">
              {quiz.title}
            </h1>
          </section>

          <section className="border-border mt-6 grid grid-cols-2 border-y py-5 text-center">
            <div className="border-border border-r">
              <p className="text-muted-foreground text-sm font-bold">
                {currentResult ? "점수" : "참여자"}
              </p>
              <p className="text-primary mt-1 text-3xl font-black">
                {currentResult ? currentResult.score : rankings.length}
                <span className="ml-1 text-base">
                  {currentResult ? "점" : "명"}
                </span>
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-bold">
                {currentResult ? "내 순위" : "평균 점수"}
              </p>
              <p className="text-foreground mt-1 text-3xl font-black">
                {currentResult ? currentResult.rank : averageScore}
                <span className="ml-1 text-base">
                  {currentResult ? "등" : "점"}
                </span>
              </p>
              {currentResult && (
                <p className="text-subtle-foreground mt-1 text-xs">
                  {rankings.length}명 중
                </p>
              )}
            </div>
          </section>

          <section className="mt-7">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-primary text-xs font-bold">Leaderboard</p>
                <h2 className="text-foreground mt-1 text-lg font-black">
                  전체 순위
                </h2>
              </div>
              <span className="text-subtle-foreground text-xs font-medium">
                총 {rankings.length}명
              </span>
            </div>

            {rankings.length === 0 ? (
              <div className="border-border text-muted-foreground mt-4 flex min-h-36 items-center justify-center border-y px-4 text-center text-sm font-medium">
                아직 퀴즈에 참여한 사람이 없어요.
              </div>
            ) : (
              <div className="border-border mt-4 divide-y divide-gray-100 border-y">
                {rankings.map((participant) => {
                  const isCurrentResult =
                    participant.quizResultId === currentResult?.quizResultId;
                  const isDeleting =
                    deleteResultMutation.isPending &&
                    deleteResultMutation.variables?.quizResultId ===
                      participant.quizResultId;

                  return (
                    <div
                      key={participant.quizResultId}
                      className={`flex min-h-14 items-center gap-3 px-3 py-2 ${
                        isCurrentResult ? "bg-primary-soft" : ""
                      }`}
                    >
                      <div className="flex w-8 shrink-0 items-center justify-center font-black">
                        {participant.rank === 1 ? (
                          <Crown className="h-5 w-5 text-amber-500" />
                        ) : participant.rank <= 3 ? (
                          <Medal className="text-subtle-foreground h-5 w-5" />
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            {participant.rank}
                          </span>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        <span
                          className={`truncate text-sm font-bold ${
                            isCurrentResult ? "text-blue-700" : "text-gray-700"
                          }`}
                        >
                          {participant.nickname}
                        </span>
                        {isCurrentResult && (
                          <span className="text-primary-strong shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold">
                            내 결과
                          </span>
                        )}
                      </div>

                      <span
                        className={`shrink-0 text-sm font-black ${
                          isCurrentResult
                            ? "text-primary-strong"
                            : "text-gray-900"
                        }`}
                      >
                        {participant.score}점
                      </span>

                      {isMyQuiz && (
                        <button
                          type="button"
                          onClick={() => handleDeleteResult(participant)}
                          disabled={isDeleting}
                          aria-label={`${participant.nickname}님의 결과 삭제`}
                          title="결과 삭제"
                          className="text-subtle-foreground flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed"
                        >
                          {isDeleting ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <div className="mt-7 grid grid-cols-2 gap-2">
            <Link
              to="/"
              className="border-border bg-surface hover:bg-background flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-bold text-gray-600 transition-colors"
            >
              <Home className="h-4 w-4" />
              홈으로
            </Link>
            <Link
              to={`/quizzes/${code}`}
              className="bg-primary hover:bg-primary-hover flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold text-white transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              다시 풀기
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
