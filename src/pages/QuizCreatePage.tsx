import Button from "@/components/common/Button";
import { useCreateQuiz } from "@/hooks/use-quiz";
import type { QuizCreateInfo } from "@/types/types";
import { Plus, Trash2 } from "lucide-react";
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
  correctOptionId: number;
}

let nextDraftId = 0;

const createDraftOption = (): DraftOption => ({
  id: nextDraftId++,
  content: "",
});

const createDraftQuestion = (): DraftQuestion => {
  const options = [createDraftOption(), createDraftOption()];

  return {
    id: nextDraftId++,
    content: "",
    options,
    correctOptionId: options[0].id,
  };
};

export default function QuizCreatePage() {
  const navigate = useNavigate();
  const { mutate: createQuiz, isPending } = useCreateQuiz();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<DraftQuestion[]>(() => [
    createDraftQuestion(),
  ]);

  const isValid =
    !!title.trim() &&
    questions.every(
      (question) =>
        !!question.content.trim() &&
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

      const options = question.options.filter(
        (option) => option.id !== optionId,
      );

      return {
        ...question,
        options,
        correctOptionId:
          question.correctOptionId === optionId
            ? options[0].id
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
    <div className="flex-1 overflow-y-auto px-4 py-6 pb-20">
      <main className="mx-auto w-full max-w-2xl">
        <header className="border-b border-gray-200 pb-5">
          <p className="text-sm font-bold text-blue-500">나만의 퀴즈</p>
          <h1 className="mt-1 text-2xl font-black text-gray-950">
            퀴즈 만들기
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            친구들이 나를 얼마나 잘 아는지 확인할 질문을 만들어보세요.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
          <section className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm font-bold text-gray-800">
              퀴즈 제목
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="예: 나를 얼마나 잘 알고 있을까?"
                disabled={isPending}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base font-normal text-gray-900 outline-none focus:border-blue-400"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-bold text-gray-800">
              소개
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="퀴즈에 대한 짧은 소개를 적어주세요."
                rows={3}
                disabled={isPending}
                className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-base font-normal text-gray-900 outline-none focus:border-blue-400"
              />
            </label>
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-gray-900">문제</h2>
              <span className="text-sm font-medium text-gray-400">
                {questions.length}개
              </span>
            </div>

            {questions.map((question, questionIndex) => (
              <article
                key={question.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-black text-gray-900">
                    문제 {questionIndex + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    disabled={questions.length === 1 || isPending}
                    aria-label="문제 삭제"
                    title="문제 삭제"
                    className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:text-gray-200"
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
                  placeholder="질문을 입력해주세요."
                  disabled={isPending}
                  className="mt-3 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-900 outline-none focus:border-blue-400 focus:bg-white"
                />

                <div className="mt-4 flex flex-col gap-2">
                  <p className="text-xs font-bold text-gray-500">
                    정답 하나를 선택해주세요
                  </p>

                  {question.options.map((option, optionIndex) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-option-${question.id}`}
                        checked={question.correctOptionId === option.id}
                        onChange={() =>
                          updateQuestion(question.id, (current) => ({
                            ...current,
                            correctOptionId: option.id,
                          }))
                        }
                        disabled={isPending}
                        aria-label={`${optionIndex + 1}번 선택지를 정답으로 선택`}
                        className="h-4 w-4 shrink-0 cursor-pointer accent-blue-500"
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
                        placeholder={`선택지 ${optionIndex + 1}`}
                        disabled={isPending}
                        className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400"
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(question.id, option.id)}
                        disabled={question.options.length === 2 || isPending}
                        aria-label="선택지 삭제"
                        title="선택지 삭제"
                        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-red-500 disabled:cursor-not-allowed disabled:text-gray-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addOption(question.id)}
                    disabled={isPending}
                    className="mt-1 flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 py-2.5 text-sm font-bold text-gray-500 hover:border-blue-300 hover:text-blue-500 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                    선택지 추가
                  </button>
                </div>
              </article>
            ))}

            <button
              type="button"
              onClick={() =>
                setQuestions((current) => [...current, createDraftQuestion()])
              }
              disabled={isPending}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 py-3 text-sm font-bold text-blue-500 hover:bg-blue-100 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
              문제 추가
            </button>
          </section>

          <Button
            type="submit"
            disabled={!isValid || isPending}
            className="w-full"
          >
            {isPending ? "만드는 중..." : "퀴즈 만들기"}
          </Button>
        </form>
      </main>
    </div>
  );
}
