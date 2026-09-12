import Fallback from "@/components/common/Fallback";
import Loader from "@/components/common/Loader";
import { useGetQuizzesByUser } from "@/queries/quiz.queries";
import { Brain, Pencil, Plus, Share2, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function QuizListPage() {
  const {
    data: quizzes = [],
    isLoading,
    isError,
    refetch,
  } = useGetQuizzesByUser();

  const copyQuizLink = async (code: string) => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/quizzes/${code}`,
      );
      toast.success("퀴즈 링크를 복사했어요.");
    } catch {
      toast.error("링크를 복사하지 못했어요.");
    }
  };

  if (isLoading) return <Loader fullPage />;
  if (isError) return <Fallback onRetry={() => refetch()} />;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 pb-20">
      <main className="mx-auto w-full max-w-2xl">
        <header className="border-border flex items-end justify-between gap-4 border-b pb-5">
          <div className="min-w-0">
            <p className="text-primary text-sm font-bold">나만의 퀴즈</p>
            <h1 className="text-foreground mt-1 text-2xl font-black">
              내 퀴즈
            </h1>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              만든 퀴즈를 확인하고 친구에게 공유해보세요.
            </p>
          </div>

          <Link
            to="/quizzes/new"
            aria-label="퀴즈 만들기"
            title="퀴즈 만들기"
            className="bg-primary hover:bg-primary-hover active:bg-primary-hover flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-colors"
          >
            <Plus className="h-5 w-5" />
          </Link>
        </header>

        {quizzes.length === 0 ? (
          <section className="flex min-h-80 flex-col items-center justify-center px-4 text-center">
            <div className="bg-primary-soft text-primary flex h-12 w-12 items-center justify-center rounded-full">
              <Brain className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-base font-black text-gray-900">
              아직 만든 퀴즈가 없어요
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              첫 퀴즈를 만들고 친구들과 나눠보세요.
            </p>
          </section>
        ) : (
          <section className="mt-5 flex flex-col gap-3">
            {quizzes.map((quiz) => (
              <article
                key={quiz.code}
                className="border-border bg-surface flex items-center gap-3 rounded-lg border p-4 shadow-sm"
              >
                <Link
                  to={`/quizzes/${quiz.code}`}
                  className="flex min-w-0 flex-1 items-center gap-3"
                >
                  <div className="bg-primary-soft text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-lg">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-foreground truncate text-base font-black">
                      {quiz.title}
                    </h2>
                    <p className="text-muted-foreground mt-1 truncate text-sm">
                      {quiz.description || "친구들에게 나를 소개하는 퀴즈"}
                    </p>
                    <p className="text-primary mt-2 text-xs font-bold">
                      문제 {quiz.questions.length}개
                    </p>
                  </div>
                </Link>

                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    to={`/quizzes/${quiz.code}/edit`}
                    aria-label={`${quiz.title} 수정`}
                    title="퀴즈 수정"
                    className="text-subtle-foreground hover:bg-primary-soft hover:text-primary flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                  >
                    <Pencil className="h-4.5 w-4.5" />
                  </Link>
                  <Link
                    to={`/quizzes/${quiz.code}/result`}
                    aria-label={`${quiz.title} 결과 보기`}
                    title="결과 보기"
                    className="text-subtle-foreground flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-amber-50 hover:text-amber-500"
                  >
                    <Trophy className="h-4.5 w-4.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => copyQuizLink(quiz.code)}
                    aria-label={`${quiz.title} 공유 링크 복사`}
                    title="공유 링크 복사"
                    className="text-subtle-foreground hover:bg-primary-soft hover:text-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors"
                  >
                    <Share2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
