import Button from "@/components/common/Button";
import { LoaderCircle, Plus, Trash2 } from "lucide-react";
import { useState, type SubmitEventHandler } from "react";
import { Link } from "react-router-dom";

export interface QuizTemplateFormValue {
  title: string;
  description: string | null;
  questions: QuizTemplateFormQuestion[];
}

export interface QuizTemplateFormQuestion {
  questionTemplateId: number | null;
  content: string;
  options: QuizTemplateFormOption[];
}

export interface QuizTemplateFormOption {
  optionTemplateId: number | null;
  content: string;
}

interface QuizTemplateFormProps {
  initialValue: QuizTemplateFormValue;
  isPending: boolean;
  submitLabel: string;
  pendingLabel: string;
  onSubmit: (value: QuizTemplateFormValue) => void;
}

interface DraftOption extends QuizTemplateFormOption {
  draftId: number;
}

interface DraftQuestion extends Omit<QuizTemplateFormQuestion, "options"> {
  draftId: number;
  options: DraftOption[];
}

let nextDraftId = 0;

const createDraftOption = (
  option: QuizTemplateFormOption = {
    optionTemplateId: null,
    content: "",
  },
): DraftOption => ({
  ...option,
  draftId: nextDraftId++,
});

const createDraftQuestion = (
  question: QuizTemplateFormQuestion = {
    questionTemplateId: null,
    content: "",
    options: Array.from({ length: 3 }, () => ({
      optionTemplateId: null,
      content: "",
    })),
  },
): DraftQuestion => ({
  ...question,
  draftId: nextDraftId++,
  options: question.options.map(createDraftOption),
});

export default function QuizTemplateForm({
  initialValue,
  isPending,
  submitLabel,
  pendingLabel,
  onSubmit,
}: QuizTemplateFormProps) {
  const [title, setTitle] = useState(initialValue.title);
  const [description, setDescription] = useState(
    initialValue.description ?? "",
  );
  const [questions, setQuestions] = useState<DraftQuestion[]>(() =>
    initialValue.questions.map(createDraftQuestion),
  );

  const isValid =
    !!title.trim() &&
    questions.length > 0 &&
    questions.every(
      (question) =>
        !!question.content.trim() &&
        question.options.length >= 3 &&
        question.options.length <= 4 &&
        question.options.every((option) => !!option.content.trim()),
    );

  const updateQuestion = (
    questionId: number,
    update: (question: DraftQuestion) => DraftQuestion,
  ) => {
    setQuestions((current) =>
      current.map((question) =>
        question.draftId === questionId ? update(question) : question,
      ),
    );
  };

  const addOption = (questionId: number) => {
    updateQuestion(questionId, (question) => {
      if (question.options.length === 4) return question;

      return {
        ...question,
        options: [...question.options, createDraftOption()],
      };
    });
  };

  const removeOption = (questionId: number, optionId: number) => {
    updateQuestion(questionId, (question) => {
      if (question.options.length === 3) return question;

      return {
        ...question,
        options: question.options.filter(
          (option) => option.draftId !== optionId,
        ),
      };
    });
  };

  const removeQuestion = (questionId: number) => {
    if (questions.length === 1) return;

    setQuestions((current) =>
      current.filter((question) => question.draftId !== questionId),
    );
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!isValid) return;

    onSubmit({
      title: title.trim(),
      description: description.trim() || null,
      questions: questions.map((question) => ({
        questionTemplateId: question.questionTemplateId,
        content: question.content.trim(),
        options: question.options.map((option) => ({
          optionTemplateId: option.optionTemplateId,
          content: option.content.trim(),
        })),
      })),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-7">
      <section className="border-y border-gray-200 bg-white px-5 py-5">
        <h2 className="text-base font-black text-gray-950">기본 정보</h2>
        <div className="mt-5 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-bold text-gray-700">
            제목
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="예: 너와 나의 음식 궁합 테스트"
              disabled={isPending}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base font-semibold text-gray-950 transition-colors outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-gray-700">
            설명
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="템플릿 목록에 표시할 짧은 설명"
              rows={3}
              disabled={isPending}
              className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-900 transition-colors outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-base font-black text-gray-950">
              질문과 선택지
            </h2>
            <p className="mt-1 text-xs font-medium text-gray-400">
              각 질문에는 선택지 3개 또는 4개가 필요합니다.
            </p>
          </div>
          <span className="text-sm font-bold text-gray-400">
            {questions.length}문제
          </span>
        </div>

        {questions.map((question, questionIndex) => (
          <article
            key={question.draftId}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-950 text-xs font-black text-white">
                  {questionIndex + 1}
                </span>
                <h3 className="text-sm font-black text-gray-900">
                  질문 {questionIndex + 1}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => removeQuestion(question.draftId)}
                disabled={questions.length === 1 || isPending}
                aria-label={`${questionIndex + 1}번 질문 삭제`}
                title="질문 삭제"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:text-gray-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <input
              value={question.content}
              onChange={(event) =>
                updateQuestion(question.draftId, (current) => ({
                  ...current,
                  content: event.target.value,
                }))
              }
              aria-label={`${questionIndex + 1}번 질문 내용`}
              placeholder="질문 내용을 입력해주세요."
              disabled={isPending}
              className="mt-4 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-950 transition-colors outline-none focus:border-blue-400 focus:bg-white"
            />

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {question.options.map((option, optionIndex) => (
                <div
                  key={option.draftId}
                  className="flex min-w-0 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-2"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-black text-gray-500 ring-1 ring-gray-200">
                    {optionIndex + 1}
                  </span>
                  <input
                    value={option.content}
                    onChange={(event) =>
                      updateQuestion(question.draftId, (current) => ({
                        ...current,
                        options: current.options.map((currentOption) =>
                          currentOption.draftId === option.draftId
                            ? {
                                ...currentOption,
                                content: event.target.value,
                              }
                            : currentOption,
                        ),
                      }))
                    }
                    aria-label={`${questionIndex + 1}번 질문의 ${optionIndex + 1}번 선택지`}
                    placeholder={`선택지 ${optionIndex + 1}`}
                    disabled={isPending}
                    className="min-w-0 flex-1 bg-transparent px-1 py-1.5 text-sm text-gray-900 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeOption(question.draftId, option.draftId)
                    }
                    disabled={question.options.length === 3 || isPending}
                    aria-label={`${optionIndex + 1}번 선택지 삭제`}
                    title="선택지 삭제"
                    className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white hover:text-red-500 disabled:cursor-not-allowed disabled:text-gray-200"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              {question.options.length < 4 && (
                <button
                  type="button"
                  onClick={() => addOption(question.draftId)}
                  disabled={isPending}
                  className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 py-3 text-sm font-bold text-gray-500 transition-colors hover:border-blue-300 hover:text-blue-500 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                  선택지 추가
                </button>
              )}
            </div>
          </article>
        ))}

        <button
          type="button"
          onClick={() =>
            setQuestions((current) => [...current, createDraftQuestion()])
          }
          disabled={isPending}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 py-3 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
          질문 추가
        </button>
      </section>

      <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-5">
        <Link
          to="/admin"
          className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50"
        >
          취소
        </Link>
        <Button
          type="submit"
          disabled={!isValid || isPending}
          className="flex min-w-44 items-center justify-center gap-2 px-5"
        >
          {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
          {isPending ? pendingLabel : submitLabel}
        </Button>
      </div>
    </form>
  );
}
