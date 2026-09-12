import Button from "@/components/common/Button";
import {
  useGetQuizTemplate,
  useGetQuizTemplates,
} from "@/queries/quiz-template.queries";
import { useCreateQuiz } from "@/queries/quiz.queries";
import type { QuizCreateInfo } from "@/domain/quiz.type";
import type {
  QuestionTemplateDto,
  QuizTemplateDto,
} from "@/domain/quiz.type";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  LoaderCircle,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DraftOption {
  id: number;
  content: string;
}

interface DraftQuestion {
  id: number;
  content: string;
  options: DraftOption[];
  correctOptionId: number | null;
}

interface TemplatePickerProps {
  onSelect: (quizTemplateId: number) => void;
}

interface QuizTemplateEditorProps {
  quizTemplateId: number;
  onChangeTemplate: () => void;
}

let nextDraftId = 0;

const templateIconStyles = [
  "bg-primary-soft text-primary-strong",
  "bg-emerald-50 text-emerald-600",
  "bg-violet-50 text-violet-600",
  "bg-amber-50 text-amber-600",
  "bg-rose-50 text-rose-600",
  "bg-cyan-50 text-cyan-600",
];

const createDraftOption = (content = ""): DraftOption => ({
  id: nextDraftId++,
  content,
});

const createDraftQuestion = (): DraftQuestion => ({
  id: nextDraftId++,
  content: "",
  options: [createDraftOption(), createDraftOption()],
  correctOptionId: null,
});

const createDraftQuestionFromTemplate = (
  question: QuestionTemplateDto,
): DraftQuestion => ({
  id: nextDraftId++,
  content: question.content,
  options: question.options.map((option) => createDraftOption(option.content)),
  correctOptionId: null,
});

function TemplatePicker({ onSelect }: TemplatePickerProps) {
  const {
    data: templates = [],
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetQuizTemplates();

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 pb-20">
      <main className="mx-auto w-full max-w-3xl">
        <header className="border-b border-border pb-6">
          <p className="flex items-center gap-1.5 text-sm font-bold text-primary">
            <Sparkles className="h-4 w-4" />
            템플릿으로 빠르게
          </p>
          <h1 className="mt-2 text-2xl font-black text-foreground">
            어떤 퀴즈를 만들까요?
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            마음에 드는 주제를 고르면 질문과 선택지를 모두 준비해드려요. 나에게
            맞는 정답만 선택하면 퀴즈가 완성됩니다.
          </p>
        </header>

        <section className="mt-6" aria-labelledby="template-list-title">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2
                id="template-list-title"
                className="text-base font-black text-foreground"
              >
                퀴즈 템플릿
              </h2>
              <p className="mt-1 text-xs font-medium text-subtle-foreground">
                제목과 소개를 확인하고 하나를 선택해주세요.
              </p>
            </div>
            {!isLoading && !isError && (
              <span className="shrink-0 text-sm font-bold text-subtle-foreground">
                {templates.length}개
              </span>
            )}
          </div>

          {isLoading && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-40 animate-pulse rounded-lg border border-border bg-surface p-5"
                >
                  <div className="h-10 w-10 rounded-lg bg-gray-100" />
                  <div className="mt-5 h-4 w-3/5 rounded bg-gray-100" />
                  <div className="mt-3 h-3 w-full rounded bg-gray-100" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="mt-4 flex min-h-56 flex-col items-center justify-center gap-4 border-y border-border bg-surface px-4 text-center">
              <TriangleAlert className="h-6 w-6 text-subtle-foreground" />
              <p className="text-sm font-semibold text-muted-foreground">
                템플릿을 불러오지 못했습니다.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-hover"
              >
                <RotateCcw className="h-4 w-4" />
                다시 시도하기
              </button>
            </div>
          )}

          {!isLoading && !isError && templates.length === 0 && (
            <div className="mt-4 flex min-h-56 flex-col items-center justify-center gap-3 border-y border-border bg-surface px-4 text-center">
              <BookOpenCheck className="h-7 w-7 text-gray-300" />
              <p className="text-sm font-semibold text-muted-foreground">
                아직 사용할 수 있는 템플릿이 없습니다.
              </p>
            </div>
          )}

          {!isLoading && !isError && templates.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {templates.map((template, index) => (
                <button
                  key={template.quizTemplateId}
                  type="button"
                  onClick={() => onSelect(template.quizTemplateId)}
                  className="group flex min-h-40 w-full cursor-pointer flex-col rounded-lg border border-border bg-surface p-5 text-left shadow-sm transition-colors hover:border-blue-300 hover:bg-primary-soft/30 active:border-blue-300"
                >
                  <div className="flex w-full items-start justify-between gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${templateIconStyles[index % templateIconStyles.length]}`}
                    >
                      <BookOpenCheck className="h-5 w-5" />
                    </span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-gray-300 transition-colors group-hover:text-primary" />
                  </div>
                  <h3 className="mt-4 text-base font-black text-foreground">
                    {template.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
                    {template.description || "나만의 정답으로 완성하는 퀴즈"}
                  </p>
                </button>
              ))}
            </div>
          )}

          {hasNextPage && (
            <button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-surface py-3 text-sm font-bold text-gray-600 transition-colors hover:border-blue-300 hover:text-primary disabled:cursor-not-allowed disabled:text-gray-300"
            >
              {isFetchingNextPage ? (
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

function QuizTemplateEditor({
  quizTemplateId,
  onChangeTemplate,
}: QuizTemplateEditorProps) {
  const {
    data: template,
    isLoading,
    isError,
    refetch,
  } = useGetQuizTemplate(quizTemplateId);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center text-subtle-foreground">
        <LoaderCircle className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (isError || !template) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <TriangleAlert className="h-6 w-6 text-subtle-foreground" />
        <p className="text-sm font-semibold text-muted-foreground">
          템플릿 상세 내용을 불러오지 못했습니다.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onChangeTemplate}
            className="cursor-pointer rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-background"
          >
            목록으로
          </button>
          <button
            type="button"
            onClick={() => refetch()}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-hover"
          >
            <RotateCcw className="h-4 w-4" />
            다시 시도하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <QuizEditorForm
      key={template.quizTemplateId}
      template={template}
      onChangeTemplate={onChangeTemplate}
    />
  );
}

function QuizEditorForm({
  template,
  onChangeTemplate,
}: {
  template: QuizTemplateDto;
  onChangeTemplate: () => void;
}) {
  const navigate = useNavigate();
  const { mutate: createQuiz, isPending } = useCreateQuiz();
  const [title, setTitle] = useState(template.title);
  const [description, setDescription] = useState(template.description ?? "");
  const [questions, setQuestions] = useState<DraftQuestion[]>(() =>
    template.questions.map(createDraftQuestionFromTemplate),
  );

  const answeredQuestionCount = questions.filter(
    (question) => question.correctOptionId !== null,
  ).length;

  const isValid =
    !!title.trim() &&
    questions.length > 0 &&
    questions.every(
      (question) =>
        !!question.content.trim() &&
        question.correctOptionId !== null &&
        question.options.length >= 2 &&
        question.options.every((option) => !!option.content.trim()),
    );

  const updateQuestion = (
    questionId: number,
    update: (question: DraftQuestion) => DraftQuestion,
  ) => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId ? update(question) : question,
      ),
    );
  };

  const removeQuestion = (questionId: number) => {
    if (questions.length === 1) return;
    setQuestions((current) =>
      current.filter((question) => question.id !== questionId),
    );
  };

  const addOption = (questionId: number) => {
    updateQuestion(questionId, (question) => ({
      ...question,
      options: [...question.options, createDraftOption()],
    }));
  };

  const removeOption = (questionId: number, optionId: number) => {
    updateQuestion(questionId, (question) => {
      if (question.options.length === 2) return question;

      return {
        ...question,
        options: question.options.filter((option) => option.id !== optionId),
        correctOptionId:
          question.correctOptionId === optionId
            ? null
            : question.correctOptionId,
      };
    });
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!isValid) return;

    const quizCreateInfo: QuizCreateInfo = {
      title: title.trim(),
      description: description.trim() || null,
      questionCreateInfos: questions.map((question) => ({
        content: question.content.trim(),
        optionCreateInfos: question.options.map((option) => ({
          content: option.content.trim(),
          correct: option.id === question.correctOptionId,
        })),
      })),
    };

    createQuiz(quizCreateInfo, {
      onSuccess: () => {
        toast.success("퀴즈를 만들었습니다.");
        navigate("/quizzes", { replace: true });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 pb-20">
      <main className="mx-auto w-full max-w-3xl">
        <header className="border-b border-border pb-6">
          <button
            type="button"
            onClick={onChangeTemplate}
            disabled={isPending}
            className="flex cursor-pointer items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-primary disabled:cursor-not-allowed disabled:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4" />
            다른 템플릿 고르기
          </button>
          <div className="mt-5 flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-primary">정답 설정</p>
              <h1 className="mt-1 text-2xl font-black text-foreground">
                나만의 답으로 완성하세요
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                질문과 선택지는 자유롭게 다듬을 수 있어요. 각 문제마다 나를 가장
                잘 나타내는 정답을 하나씩 골라주세요.
              </p>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-7">
          <section className="border-y border-border bg-surface px-4 py-5 sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-black text-foreground">퀴즈 정보</h2>
              <span className="max-w-48 truncate text-right text-xs font-bold text-subtle-foreground">
                {template.title}
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm font-bold text-gray-700">
                제목
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="퀴즈 제목"
                  disabled={isPending}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base font-semibold text-foreground transition-colors outline-none focus:border-primary-hover focus:bg-surface focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-bold text-gray-700">
                소개
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="퀴즈에 대한 짧은 소개"
                  rows={3}
                  disabled={isPending}
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm leading-6 text-gray-900 transition-colors outline-none focus:border-primary-hover focus:bg-surface focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2 className="text-base font-black text-foreground">
                  문제와 정답
                </h2>
                <p className="mt-1 text-xs font-medium text-subtle-foreground">
                  정답을 선택한 문제 {answeredQuestionCount}/{questions.length}
                </p>
              </div>
              <span className="text-sm font-bold text-subtle-foreground">
                {questions.length}문제
              </span>
            </div>

            {questions.map((question, questionIndex) => {
              const hasAnswer = question.correctOptionId !== null;

              return (
                <article
                  key={question.id}
                  className="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-950 text-xs font-black text-white">
                        {questionIndex + 1}
                      </span>
                      <span
                        className={`flex items-center gap-1 text-xs font-bold ${
                          hasAnswer ? "text-emerald-600" : "text-amber-600"
                        }`}
                      >
                        {hasAnswer && <Check className="h-3.5 w-3.5" />}
                        {hasAnswer ? "정답 선택됨" : "정답을 골라주세요"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeQuestion(question.id)}
                      disabled={questions.length === 1 || isPending}
                      aria-label={`${questionIndex + 1}번 문제 삭제`}
                      title="문제 삭제"
                      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-subtle-foreground transition-colors hover:bg-danger-soft hover:text-danger disabled:cursor-not-allowed disabled:text-gray-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <input
                    value={question.content}
                    onChange={(event) =>
                      updateQuestion(question.id, (current) => ({
                        ...current,
                        content: event.target.value,
                      }))
                    }
                    aria-label={`${questionIndex + 1}번 질문`}
                    placeholder="질문을 입력해주세요."
                    disabled={isPending}
                    className="mt-4 w-full border-0 border-b border-border bg-transparent px-0 pb-3 text-base font-bold text-foreground transition-colors outline-none focus:border-primary-hover"
                  />

                  <div className="mt-4 flex flex-col gap-2.5">
                    {question.options.map((option, optionIndex) => {
                      const isCorrect = question.correctOptionId === option.id;

                      return (
                        <div
                          key={option.id}
                          className={`flex items-center gap-2 rounded-lg border p-2 transition-colors ${
                            isCorrect
                              ? "border-emerald-300 bg-emerald-50"
                              : "border-border bg-background"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`correct-option-${question.id}`}
                            checked={isCorrect}
                            onChange={() =>
                              updateQuestion(question.id, (current) => ({
                                ...current,
                                correctOptionId: option.id,
                              }))
                            }
                            disabled={isPending}
                            aria-label={`${optionIndex + 1}번 선택지를 정답으로 선택`}
                            className="h-5 w-5 shrink-0 cursor-pointer accent-emerald-500"
                          />
                          <input
                            value={option.content}
                            onChange={(event) =>
                              updateQuestion(question.id, (current) => ({
                                ...current,
                                options: current.options.map((currentOption) =>
                                  currentOption.id === option.id
                                    ? {
                                        ...currentOption,
                                        content: event.target.value,
                                      }
                                    : currentOption,
                                ),
                              }))
                            }
                            aria-label={`${optionIndex + 1}번 선택지 내용`}
                            placeholder={`선택지 ${optionIndex + 1}`}
                            disabled={isPending}
                            className="min-w-0 flex-1 bg-transparent px-1 py-1.5 text-sm text-gray-900 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => removeOption(question.id, option.id)}
                            disabled={
                              question.options.length === 2 || isPending
                            }
                            aria-label={`${optionIndex + 1}번 선택지 삭제`}
                            title="선택지 삭제"
                            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-subtle-foreground transition-colors hover:bg-surface hover:text-danger disabled:cursor-not-allowed disabled:text-gray-200"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => addOption(question.id)}
                      disabled={isPending}
                      className="mt-0.5 flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 py-2.5 text-sm font-bold text-muted-foreground transition-colors hover:border-blue-300 hover:text-primary disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                      선택지 추가
                    </button>
                  </div>
                </article>
              );
            })}

            <button
              type="button"
              onClick={() =>
                setQuestions((current) => [...current, createDraftQuestion()])
              }
              disabled={isPending}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-200 bg-primary-soft py-3 text-sm font-bold text-primary-strong transition-colors hover:bg-blue-100 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
              문제 추가
            </button>
          </section>

          <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
            <div className="min-w-0">
              <p className="text-xs font-bold text-subtle-foreground">완성도</p>
              <p className="mt-0.5 text-sm font-black text-gray-900">
                정답 {answeredQuestionCount}/{questions.length}
              </p>
            </div>
            <Button
              type="submit"
              disabled={!isValid || isPending}
              className="flex min-w-36 items-center justify-center gap-2 px-5"
            >
              {isPending ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
              {isPending ? "만드는 중" : "퀴즈 만들기"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default function QuizCreatePage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null,
  );

  if (selectedTemplateId === null) {
    return <TemplatePicker onSelect={setSelectedTemplateId} />;
  }

  return (
    <QuizTemplateEditor
      quizTemplateId={selectedTemplateId}
      onChangeTemplate={() => setSelectedTemplateId(null)}
    />
  );
}
