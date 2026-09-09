import { fetchQuizTemplate, fetchQuizTemplates } from "@/domains/api/quiz-template";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const QUIZ_TEMPLATE_KEYS = {
  all: ["quiz-template"],
  lists: ["quiz-template", "list"],
  list: (limit: number) => ["quiz-template", "list", limit],
  details: ["quiz-template", "detail"],
  detail: (quizTemplateId: number) => [
    "quiz-template",
    "detail",
    quizTemplateId,
  ],
};

export function useFetchQuizTemplates(limit = 50) {
  return useInfiniteQuery({
    initialPageParam: undefined as number | undefined,
    queryKey: QUIZ_TEMPLATE_KEYS.list(limit),
    queryFn: ({ pageParam: cursor }) => fetchQuizTemplates({ cursor, limit }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext || lastPage.quizTemplates.length === 0) {
        return undefined;
      }

      return lastPage.quizTemplates[lastPage.quizTemplates.length - 1]
        .quizTemplateId;
    },
    select: (data) => data.pages.flatMap((page) => page.quizTemplates),
  });
}

export function useFetchQuizTemplate(quizTemplateId: number) {
  return useQuery({
    queryKey: QUIZ_TEMPLATE_KEYS.detail(quizTemplateId),
    queryFn: () => fetchQuizTemplate({ quizTemplateId }),
    enabled: quizTemplateId > 0,
  });
}
