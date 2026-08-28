import Fallback from "@/components/common/Fallback";
import Loader from "@/components/common/Loader";
import { useFetchQuizzesByUser } from "@/hooks/use-quiz";
import { Brain, Plus, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function QuizListPage() {
  const {
    data: quizzes = [],
    isLoading,
    isError,
    refetch,
  } = useFetchQuizzesByUser();

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
        <header className="flex items-end justify-between gap-4 border-b border-gray-200 pb-5">
          <div className="min-w-0">
            <p className="text-sm font-bold text-blue-500">나만의 퀴즈</p>
            <h1 className="mt-1 text-2xl font-black text-gray-950">내 퀴즈</h1>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              만든 퀴즈를 확인하고 친구에게 공유해보세요.
            </p>
          </div>

          <Link
            to="/quizzes/new"
            aria-label="퀴즈 만들기"
            title="퀴즈 만들기"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-400 active:bg-blue-400"
          >
            <Plus className="h-5 w-5" />
          </Link>
        </header>

        {quizzes.length === 0 ? (
          <section className="flex min-h-80 flex-col items-center justify-center px-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500">
              <Brain className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-base font-black text-gray-900">
              아직 만든 퀴즈가 없어요
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              첫 퀴즈를 만들고 친구들과 나눠보세요.
            </p>
          </section>
        ) : (
          <section className="mt-5 flex flex-col gap-3">
            {quizzes.map((quiz) => (
              <article
                key={quiz.code}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <Link
                  to={`/quizzes/${quiz.code}`}
                  className="flex min-w-0 flex-1 items-center gap-3"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-base font-black text-gray-950">
                      {quiz.title}
                    </h2>
                    <p className="mt-1 truncate text-sm text-gray-500">
                      {quiz.description || "친구들에게 나를 소개하는 퀴즈"}
                    </p>
                    <p className="mt-2 text-xs font-bold text-blue-500">
                      문제 {quiz.questions.length}개
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => copyQuizLink(quiz.code)}
                  aria-label={`${quiz.title} 공유 링크 복사`}
                  title="공유 링크 복사"
                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500"
                >
                  <Share2 className="h-4.5 w-4.5" />
                </button>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
