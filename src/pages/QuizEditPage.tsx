import Button from "@/components/common/Button";
import Fallback from "@/components/common/Fallback";
import Loader from "@/components/common/Loader";
import {
  useDeleteQuiz,
  useFetchQuizzesByUser,
  useUpdateQuiz,
  useUpdateQuizMetadata,
} from "@/domains/hooks/use-quiz";
import type { QuizDto, QuizUpdateInfo } from "@/domains/types/types";
import {
  ArrowLeft,
  Check,
  Info,
  ListChecks,
  LoaderCircle,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useState, type SubmitEventHandler } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface DraftOption {
  draftId: number;
  optionId: number | null;
  content: string;
}

interface DraftQuestion {
  draftId: number;
  questionId: number | null;
  content: string;
  options: DraftOption[];
  correctOptionDraftId: number | null;
}

interface QuestionEditorProps {
  question: DraftQuestion;
  questionIndex: number;
  questionCount: number;
  disabled: boolean;
  onChange: (question: DraftQuestion) => void;
  onRemove: () => void;
}

let nextDraftId = 0;

const createDraftOption = (
  content = "",
  optionId: number | null = null,
): DraftOption => ({
  draftId: nextDraftId++,
  optionId,
  content,
});

const createDraftQuestion = (): DraftQuestion => ({
  draftId: nextDraftId++,
  questionId: null,
  content: "",
  options: [createDraftOption(), createDraftOption()],
  correctOptionDraftId: null,
});

const createDraftQuestions = (quiz: QuizDto): DraftQuestion[] =>
  quiz.questions.map((question) => ({
    draftId: nextDraftId++,
    questionId: question.questionId,
    content: question.content,
    options: question.options.map((option) =>
      createDraftOption(option.content, option.optionId),
    ),
    correctOptionDraftId: null,
  }));

function QuestionEditor({
  question,
  questionIndex,
  questionCount,
  disabled,
  onChange,
  onRemove,
}: QuestionEditorProps) {
  const addOption = () => {
    onChange({
      ...question,
      options: [...question.options, createDraftOption()],
    });
  };

  const removeOption = (draftId: number) => {
    if (question.options.length === 2) return;

    onChange({
      ...question,
      options: question.options.filter((option) => option.draftId !== draftId),
      correctOptionDraftId:
        question.correctOptionDraftId === draftId
          ? null
          : question.correctOptionDraftId,
    });
  };

  return (
    <article className="border-border bg-surface rounded-lg border p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-950 text-xs font-black text-white">
            {questionIndex + 1}
          </span>
          <span
            className={`flex items-center gap-1 text-xs font-bold ${
              question.correctOptionDraftId === null
                ? "text-amber-600"
                : "text-emerald-600"
            }`}
          >
            {question.correctOptionDraftId !== null && (
              <Check className="h-3.5 w-3.5" />
            )}
            {question.correctOptionDraftId === null
              ? "정답을 골라주세요"
              : "정답 선택됨"}
          </span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          disabled={questionCount === 1 || disabled}
          aria-label={`${questionIndex + 1}번 문제 삭제`}
          title="문제 삭제"
          className="text-subtle-foreground hover:bg-danger-soft hover:text-danger flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:text-gray-200"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <input
        value={question.content}
        onChange={(event) =>
          onChange({ ...question, content: event.target.value })
        }
        aria-label={`${questionIndex + 1}번 질문`}
        placeholder="질문을 입력해주세요."
        disabled={disabled}
        className="border-border text-foreground focus:border-primary-hover mt-4 w-full border-0 border-b bg-transparent px-0 pb-3 text-base font-bold transition-colors outline-none"
      />

      <div className="mt-4 flex flex-col gap-2.5">
        {question.options.map((option, optionIndex) => {
          const isCorrect = question.correctOptionDraftId === option.draftId;

          return (
            <div
              key={option.draftId}
              className={`flex items-center gap-2 rounded-lg border p-2 transition-colors ${
                isCorrect
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-border bg-background"
              }`}
            >
              <input
                type="radio"
                name={`correct-option-${question.draftId}`}
                checked={isCorrect}
                onChange={() =>
                  onChange({
                    ...question,
                    correctOptionDraftId: option.draftId,
                  })
                }
                disabled={disabled}
                aria-label={`${optionIndex + 1}번 선택지를 정답으로 선택`}
                className="h-5 w-5 shrink-0 cursor-pointer accent-emerald-500"
              />
              <input
                value={option.content}
                onChange={(event) =>
                  onChange({
                    ...question,
                    options: question.options.map((currentOption) =>
                      currentOption.draftId === option.draftId
                        ? { ...currentOption, content: event.target.value }
                        : currentOption,
                    ),
                  })
                }
                aria-label={`${optionIndex + 1}번 선택지 내용`}
                placeholder={`선택지 ${optionIndex + 1}`}
                disabled={disabled}
                className="min-w-0 flex-1 bg-transparent px-1 py-1.5 text-sm text-gray-900 outline-none"
              />
              <button
                type="button"
                onClick={() => removeOption(option.draftId)}
                disabled={question.options.length === 2 || disabled}
                aria-label={`${optionIndex + 1}번 선택지 삭제`}
                title="선택지 삭제"
                className="text-subtle-foreground hover:bg-surface hover:text-danger flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:text-gray-200"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={addOption}
          disabled={disabled}
          className="text-muted-foreground hover:text-primary mt-0.5 flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 py-2.5 text-sm font-bold transition-colors hover:border-blue-300 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
          선택지 추가
        </button>
      </div>
    </article>
  );
}

function QuizEditForm({ quiz }: { quiz: QuizDto }) {
  const navigate = useNavigate();
  const updateMetadataMutation = useUpdateQuizMetadata();
  const updateQuizMutation = useUpdateQuiz();
  const deleteQuizMutation = useDeleteQuiz();
  const [activeTab, setActiveTab] = useState<"metadata" | "questions">(
    "metadata",
  );
  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description ?? "");
  const [questions, setQuestions] = useState<DraftQuestion[]>(() =>
    createDraftQuestions(quiz),
  );

  const isPending =
    updateMetadataMutation.isPending ||
    updateQuizMutation.isPending ||
    deleteQuizMutation.isPending;
  const answeredQuestionCount = questions.filter(
    (question) => question.correctOptionDraftId !== null,
  ).length;
  const isMetadataValid = !!title.trim();
  const isQuizValid =
    isMetadataValid &&
    questions.length > 0 &&
    questions.every(
      (question) =>
        !!question.content.trim() &&
        question.correctOptionDraftId !== null &&
        question.options.length >= 2 &&
        question.options.every((option) => !!option.content.trim()),
    );

  const updateQuestion = (updatedQuestion: DraftQuestion) => {
    setQuestions((current) =>
      current.map((question) =>
        question.draftId === updatedQuestion.draftId
          ? updatedQuestion
          : question,
      ),
    );
  };

  const handleMetadataSubmit: SubmitEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    if (!isMetadataValid) return;

    try {
      await updateMetadataMutation.mutateAsync({
        code: quiz.code,
        quizMetadataUpdateInfo: {
          title: title.trim(),
          description: description.trim() || null,
        },
      });
      toast.success("퀴즈 정보를 수정했습니다.");
      navigate("/quizzes", { replace: true });
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const handleQuizSubmit: SubmitEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    if (!isQuizValid) return;

    const quizUpdateInfo: QuizUpdateInfo = {
      title: title.trim(),
      description: description.trim() || null,
      questionUpdateInfos: questions.map((question) => ({
        questionId: question.questionId,
        content: question.content.trim(),
        optionUpdateInfos: question.options.map((option) => ({
          optionId: option.optionId,
          content: option.content.trim(),
          correct: option.draftId === question.correctOptionDraftId,
        })),
      })),
    };

    try {
      await updateQuizMutation.mutateAsync({
        code: quiz.code,
        quizUpdateInfo,
      });
      toast.success("퀴즈를 수정했습니다.");
      navigate("/quizzes", { replace: true });
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const handleDeleteQuiz = async () => {
    if (!window.confirm(`'${quiz.title}' 퀴즈를 삭제하시겠습니까?`)) return;

    try {
      await deleteQuizMutation.mutateAsync({ code: quiz.code });
      toast.success("퀴즈를 삭제했습니다.");
      navigate("/quizzes", { replace: true });
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 pb-20">
      <main className="mx-auto w-full max-w-3xl">
        <header className="border-border border-b pb-5">
          <Link
            to="/quizzes"
            className="text-muted-foreground hover:text-primary flex w-fit items-center gap-1.5 text-sm font-bold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />내 퀴즈
          </Link>
          <h1 className="text-foreground mt-5 text-2xl font-black">
            퀴즈 수정
          </h1>
          <p className="text-muted-foreground mt-2 truncate text-sm">
            {quiz.title}
          </p>
        </header>

        <div
          role="tablist"
          aria-label="퀴즈 수정 항목"
          className="border-border mt-5 grid grid-cols-2 border-b"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "metadata"}
            onClick={() => setActiveTab("metadata")}
            className={`flex cursor-pointer items-center justify-center gap-2 border-b-2 px-3 py-3 text-sm font-bold transition-colors ${
              activeTab === "metadata"
                ? "border-primary text-primary"
                : "text-muted-foreground hover:text-foreground border-transparent"
            }`}
          >
            <Info className="h-4 w-4" />
            기본 정보
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "questions"}
            onClick={() => setActiveTab("questions")}
            className={`flex cursor-pointer items-center justify-center gap-2 border-b-2 px-3 py-3 text-sm font-bold transition-colors ${
              activeTab === "questions"
                ? "border-primary text-primary"
                : "text-muted-foreground hover:text-foreground border-transparent"
            }`}
          >
            <ListChecks className="h-4 w-4" />
            문제 구성
          </button>
        </div>

        {activeTab === "metadata" ? (
          <form onSubmit={handleMetadataSubmit} className="mt-6">
            <section className="border-border bg-surface border-y px-4 py-5 sm:px-5">
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-2 text-sm font-bold text-gray-700">
                  제목
                  <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    disabled={isPending}
                    className="border-border bg-background text-foreground focus:border-primary-hover focus:bg-surface w-full rounded-lg border px-4 py-3 text-base font-semibold outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold text-gray-700">
                  소개
                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows={4}
                    disabled={isPending}
                    className="border-border bg-background focus:border-primary-hover focus:bg-surface w-full resize-none rounded-lg border px-4 py-3 text-sm leading-6 text-gray-900 outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </label>
              </div>
            </section>

            <div className="mt-5 flex justify-end">
              <Button
                type="submit"
                disabled={!isMetadataValid || isPending}
                className="flex min-w-36 items-center justify-center gap-2 px-5"
              >
                {updateMetadataMutation.isPending ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                정보 저장
              </Button>
            </div>

            <section className="mt-12 border-t border-red-100 pt-5">
              <h2 className="text-danger text-sm font-black">퀴즈 삭제</h2>
              <p className="text-muted-foreground mt-1 text-xs leading-5">
                퀴즈와 모든 참여 결과가 함께 삭제됩니다.
              </p>
              <button
                type="button"
                onClick={handleDeleteQuiz}
                disabled={isPending}
                className="text-danger mt-4 flex cursor-pointer items-center gap-2 text-sm font-bold disabled:cursor-not-allowed disabled:text-gray-300"
              >
                {deleteQuizMutation.isPending ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                이 퀴즈 삭제
              </button>
            </section>
          </form>
        ) : (
          <form onSubmit={handleQuizSubmit} className="mt-6">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2 className="text-foreground text-base font-black">
                  문제와 정답
                </h2>
                <p className="text-subtle-foreground mt-1 text-xs font-medium">
                  정답을 선택한 문제 {answeredQuestionCount}/{questions.length}
                </p>
              </div>
              <span className="text-subtle-foreground text-sm font-bold">
                {questions.length}문제
              </span>
            </div>

            <p className="mt-4 border-l-2 border-amber-300 bg-amber-50 px-3 py-2.5 text-xs leading-5 font-medium text-amber-800">
              문제 구성을 저장하려면 각 문제의 정답을 다시 선택해주세요.
            </p>

            <div className="mt-4 flex flex-col gap-4">
              {questions.map((question, questionIndex) => (
                <QuestionEditor
                  key={question.draftId}
                  question={question}
                  questionIndex={questionIndex}
                  questionCount={questions.length}
                  disabled={isPending}
                  onChange={updateQuestion}
                  onRemove={() =>
                    setQuestions((current) =>
                      current.filter(
                        (item) => item.draftId !== question.draftId,
                      ),
                    )
                  }
                />
              ))}

              <button
                type="button"
                onClick={() =>
                  setQuestions((current) => [...current, createDraftQuestion()])
                }
                disabled={isPending}
                className="bg-primary-soft text-primary-strong flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-200 py-3 text-sm font-bold transition-colors hover:bg-blue-100 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4" />
                문제 추가
              </button>
            </div>

            <div className="border-border mt-7 flex items-center justify-between gap-3 border-t pt-4">
              <p className="text-sm font-black text-gray-900">
                정답 {answeredQuestionCount}/{questions.length}
              </p>
              <Button
                type="submit"
                disabled={!isQuizValid || isPending}
                className="flex min-w-36 items-center justify-center gap-2 px-5"
              >
                {updateQuizMutation.isPending ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                문제 저장
              </Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

export default function QuizEditPage() {
  const { code = "" } = useParams();
  const {
    data: quizzes,
    isLoading,
    isError,
    refetch,
  } = useFetchQuizzesByUser();

  if (isLoading) return <Loader fullPage />;
  if (isError || !quizzes) {
    return <Fallback onRetry={() => refetch()} />;
  }

  const quiz = quizzes.find((item) => item.code === code);
  if (!quiz) return <Navigate to="/quizzes" replace />;

  return <QuizEditForm key={quiz.code} quiz={quiz} />;
}
