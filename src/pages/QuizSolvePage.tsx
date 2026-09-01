import Button from "@/components/common/Button";
import Fallback from "@/components/common/Fallback";
import Loader from "@/components/common/Loader";
import { useFetchQuiz } from "@/hooks/use-quiz";
import {
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  UserRound,
} from "lucide-react";
import { useState, type SubmitEventHandler } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function QuizSolvePage() {
  const { code = "" } = useParams();
  const navigate = useNavigate();
  const { data: quiz, isLoading, isError, refetch } = useFetchQuiz(code);
  const [nickname, setNickname] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  if (isLoading) return <Loader fullPage />;
  if (isError || !quiz) return <Fallback onRetry={() => refetch()} />;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = quiz.questions.length
    ? ((currentQuestionIndex + 1) / quiz.questions.length) * 100
    : 0;

  const handleStart: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!nickname.trim() || quiz.questions.length === 0) return;
    setNickname(nickname.trim());
    setHasStarted(true);
  };

  const handleQuestionSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!currentQuestion || answers[currentQuestion.questionId] === undefined) {
      return;
    }

    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

    if (isLastQuestion) {
      navigate(`/quizzes/${code}/result`, {
        state: { nickname, answers },
      });
      return;
    }

    setCurrentQuestionIndex((current) => current + 1);
  };

  const moveToPrevious = () => {
    if (currentQuestionIndex === 0) {
      setHasStarted(false);
      return;
    }

    setCurrentQuestionIndex((current) => current - 1);
  };

  return (
    <div className="app-layout">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
        <Link to="/" className="text-lg font-black text-primary">
          첨벙
        </Link>
        <span className="text-sm font-bold text-muted-foreground">친구 퀴즈</span>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 pb-12">
        <main className="mx-auto w-full max-w-xl">
          {!hasStarted ? (
            <section className="flex min-h-100 flex-col justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Brain className="h-6 w-6" />
              </div>
              <h1 className="mt-4 text-2xl font-black text-foreground">
                {quiz.title}
              </h1>
              {quiz.description && (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {quiz.description}
                </p>
              )}
              <p className="mt-3 text-xs font-bold text-primary">
                총 {quiz.questions.length}문제
              </p>

              <form
                onSubmit={handleStart}
                className="mt-8 border-t border-border pt-6"
              >
                <label className="text-sm font-bold text-gray-800">
                  순위표에 표시할 닉네임
                  <div className="relative mt-2">
                    <UserRound className="absolute top-1/2 left-3 h-4.5 w-4.5 -translate-y-1/2 text-subtle-foreground" />
                    <input
                      value={nickname}
                      onChange={(event) => setNickname(event.target.value)}
                      maxLength={12}
                      placeholder="닉네임을 입력해주세요."
                      autoFocus
                      className="w-full rounded-lg border border-border bg-surface py-3 pr-4 pl-10 text-base text-gray-900 outline-none focus:border-primary-hover"
                    />
                  </div>
                </label>
                <p className="mt-2 text-xs text-subtle-foreground">
                  입력한 닉네임은 퀴즈 순위표에 공개돼요.
                </p>

                <Button
                  type="submit"
                  disabled={!nickname.trim() || quiz.questions.length === 0}
                  className="mt-6 w-full"
                >
                  퀴즈 시작하기
                </Button>
              </form>
            </section>
          ) : (
            <section>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-gray-900">
                    {quiz.title}
                  </p>
                  <p className="mt-1 text-xs font-medium text-subtle-foreground">
                    {nickname}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-black text-primary">
                  {currentQuestionIndex + 1} / {quiz.questions.length}
                </span>
              </div>

              <div className="mt-4 h-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {currentQuestion && (
                <form
                  onSubmit={handleQuestionSubmit}
                  className="mt-6 flex flex-col"
                >
                  <article className="rounded-lg border border-border bg-surface p-5 shadow-sm">
                    <p className="text-xs font-black text-primary">
                      문제 {currentQuestionIndex + 1}
                    </p>
                    <h1 className="mt-2 text-lg leading-7 font-black text-foreground">
                      {currentQuestion.content}
                    </h1>

                    <div className="mt-6 flex flex-col gap-2.5">
                      {currentQuestion.options.map((option, optionIndex) => {
                        const isSelected =
                          answers[currentQuestion.questionId] ===
                          option.optionId;

                        return (
                          <label
                            key={option.optionId}
                            className={`flex min-h-13 cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 text-sm transition-colors ${
                              isSelected
                                ? "border-primary-hover bg-primary-soft text-blue-700"
                                : "border-border bg-surface text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${currentQuestion.questionId}`}
                              checked={isSelected}
                              onChange={() =>
                                setAnswers((current) => ({
                                  ...current,
                                  [currentQuestion.questionId]: option.optionId,
                                }))
                              }
                              className="sr-only"
                            />
                            <span
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                                isSelected
                                  ? "bg-primary text-white"
                                  : "bg-gray-100 text-muted-foreground"
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

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={moveToPrevious}
                      className="flex items-center justify-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      이전
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        answers[currentQuestion.questionId] === undefined
                      }
                      className="flex items-center justify-center gap-1"
                    >
                      {currentQuestionIndex === quiz.questions.length - 1
                        ? "결과 보기"
                        : "다음 문제"}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
