import QuizTemplateForm, {
  type QuizTemplateFormValue,
} from "@/components/admin/QuizTemplateForm";
import { useCreateQuizTemplate } from "@/hooks/use-admin-quiz-template";
import type { QuizTemplateCreateInfo } from "@/types/types";
import { ArrowLeft, FilePlus2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialValue: QuizTemplateFormValue = {
  title: "",
  description: null,
  questions: [
    {
      questionTemplateId: null,
      content: "",
      options: Array.from({ length: 3 }, () => ({
        optionTemplateId: null,
        content: "",
      })),
    },
  ],
};

export default function AdminQuizTemplateCreatePage() {
  const navigate = useNavigate();
  const { mutate: createQuizTemplate, isPending } = useCreateQuizTemplate();

  const handleSubmit = (value: QuizTemplateFormValue) => {
    const createInfo: QuizTemplateCreateInfo = {
      title: value.title,
      description: value.description,
      questionTemplates: value.questions.map((question) => ({
        content: question.content,
        optionTemplates: question.options.map((option) => option.content),
      })),
    };

    createQuizTemplate(createInfo, {
      onSuccess: () => {
        toast.success("퀴즈 템플릿을 추가했습니다.");
        navigate("/admin", { replace: true });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-gray-50">
      <main className="mx-auto w-full max-w-4xl min-w-200 px-6 py-9 pb-20">
        <header className="border-b border-gray-200 pb-6">
          <Link
            to="/admin"
            className="flex w-fit items-center gap-1.5 text-sm font-bold text-gray-500 transition-colors hover:text-blue-500"
          >
            <ArrowLeft className="h-4 w-4" />
            운영 현황으로
          </Link>

          <div className="mt-5 flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FilePlus2 className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-gray-950">
                퀴즈 템플릿 추가
              </h1>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                사용자가 제목과 설명을 보고 선택할 수 있는 질문 세트를 만듭니다.
              </p>
            </div>
          </div>
        </header>

        <QuizTemplateForm
          initialValue={initialValue}
          isPending={isPending}
          submitLabel="템플릿 추가"
          pendingLabel="추가하는 중..."
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}
