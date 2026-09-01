import QuizTemplateForm, {
  type QuizTemplateFormValue,
} from "@/components/admin/QuizTemplateForm";
import Fallback from "@/components/common/Fallback";
import Loader from "@/components/common/Loader";
import {
  useFetchAdminQuizTemplate,
  useUpdateQuizTemplate,
} from "@/hooks/use-admin-quiz-template";
import type { QuizTemplateUpdateInfo } from "@/types/types";
import { ArrowLeft, Pencil } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function AdminQuizTemplateEditPage() {
  const navigate = useNavigate();
  const { quizTemplateId: quizTemplateIdParam } = useParams();
  const quizTemplateId = Number(quizTemplateIdParam);
  const templateQuery = useFetchAdminQuizTemplate(quizTemplateId);
  const { mutate: updateQuizTemplate, isPending } = useUpdateQuizTemplate();

  if (!Number.isInteger(quizTemplateId) || quizTemplateId <= 0) {
    return <Navigate to="/admin" replace />;
  }

  if (templateQuery.isLoading) {
    return <Loader />;
  }

  if (templateQuery.isError) {
    const status =
      templateQuery.error instanceof Error
        ? templateQuery.error.cause
        : undefined;

    if (status === 401 || status === 403) {
      return <Navigate to="/admin/sign-in" replace />;
    }

    return <Fallback onRetry={() => templateQuery.refetch()} />;
  }

  if (!templateQuery.data) {
    return <Navigate to="/admin" replace />;
  }

  const template = templateQuery.data;
  const initialValue: QuizTemplateFormValue = {
    title: template.title,
    description: template.description,
    questions: template.questions.map((question) => ({
      questionTemplateId: question.questionId,
      content: question.content,
      options: question.options.map((option) => ({
        optionTemplateId: option.optionId,
        content: option.content,
      })),
    })),
  };

  const handleSubmit = (value: QuizTemplateFormValue) => {
    const quizTemplateUpdateInfo: QuizTemplateUpdateInfo = {
      title: value.title,
      description: value.description,
      questionTemplateUpdateInfos: value.questions.map((question) => ({
        questionTemplateId: question.questionTemplateId,
        content: question.content,
        optionTemplateUpdateInfos: question.options.map((option) => ({
          optionTemplateId: option.optionTemplateId,
          content: option.content,
        })),
      })),
    };

    updateQuizTemplate(
      { quizTemplateId, quizTemplateUpdateInfo },
      {
        onSuccess: () => {
          toast.success("퀴즈 템플릿을 수정했습니다.");
          navigate("/admin", { replace: true });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <main className="mx-auto w-full max-w-4xl min-w-200 px-6 py-9 pb-20">
        <header className="border-b border-border pb-6">
          <Link
            to="/admin"
            className="flex w-fit items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            운영 현황으로
          </Link>

          <div className="mt-5 flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Pencil className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-foreground">
                퀴즈 템플릿 수정
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                제목과 설명, 질문과 선택지를 변경할 수 있습니다.
              </p>
            </div>
          </div>
        </header>

        <QuizTemplateForm
          key={template.quizTemplateId}
          initialValue={initialValue}
          isPending={isPending}
          submitLabel="변경사항 저장"
          pendingLabel="저장하는 중..."
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}
