import Button from "@/components/common/Button";
import Fallback from "@/components/common/Fallback";
import Loader from "@/components/common/Loader";
import { useFetchQuiz } from "@/hooks/use-quiz";
import { Check, ListChecks } from "lucide-react";
import { useState, type SubmitEventHandler } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function QuizSolvePage() {
  const { code = "" } = useParams();
  const navigate = useNavigate();
  const { data: quiz, isLoading, isError, refetch } = useFetchQuiz(code);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  if (isLoading) return <Loader fullPage />;
  if (isError || !quiz) return <Fallback onRetry={() => refetch()} />;

  const answeredCount = quiz.questions.filter(
    (question) => answers[question.questionId] !== undefined,
  ).length;
  const hasAnsweredAll = answeredCount === quiz.questions.length;

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!hasAnsweredAll) return;
    navigate(`/quizzes/${code}/result`);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
        <Link to="/" className="text-lg font-black text-blue-500">
          첨벙
        </Link>
        <span className="text-sm font-bold text-gray-500">친구 퀴즈</span>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 pb-12">
        <main className="mx-auto w-full max-w-xl">
          <section className="border-b border-gray-200 pb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <ListChecks className="h-5 w-5" />
            </div>
            <h1 className="mt-4 text-2xl font-black text-gray-950">
              {quiz.title}
            </h1>
            {quiz.description && (
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {quiz.description}
              </p>
            )}
            <p className="mt-4 text-xs font-bold text-blue-500">
              {answeredCount} / {quiz.questions.length} 답변
            </p>
          </section>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            {quiz.questions.map((question, questionIndex) => (
              <article
                key={question.questionId}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <p className="text-xs font-black text-blue-500">
                  문제 {questionIndex + 1}
                </p>
                <h2 className="mt-2 text-base leading-6 font-black text-gray-950">
                  {question.content}
                </h2>

                <div className="mt-4 flex flex-col gap-2">
                  {question.options.map((option, optionIndex) => {
                    const isSelected =
                      answers[question.questionId] === option.optionId;

                    return (
                      <label
                        key={option.optionId}
                        className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                          isSelected
                            ? "border-blue-400 bg-blue-50 text-blue-700"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${question.questionId}`}
                          checked={isSelected}
                          onChange={() =>
                            setAnswers((current) => ({
                              ...current,
                              [question.questionId]: option.optionId,
                            }))
                          }
                          className="sr-only"
                        />
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                            isSelected
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {isSelected ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            optionIndex + 1
                          )}
                        </span>
                        <span className="min-w-0 flex-1 break-words">
                          {option.content}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </article>
            ))}

            <Button
              type="submit"
              disabled={!hasAnsweredAll}
              className="mt-1 w-full"
            >
              결과 보기
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
