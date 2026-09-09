import {
  createQuizTemplate,
  deleteQuizTemplate,
  fetchAdminQuizTemplate,
  fetchAdminQuizTemplates,
  updateQuizTemplate,
} from "@/domains/api/admin-quiz-template";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { QUIZ_TEMPLATE_KEYS } from "./use-quiz-template";

export const ADMIN_QUIZ_TEMPLATE_KEYS = {
  all: ["admin", "quiz-template"],
  lists: ["admin", "quiz-template", "list"],
  list: (limit: number) => ["admin", "quiz-template", "list", limit],
  details: ["admin", "quiz-template", "detail"],
  detail: (quizTemplateId: number) => [
    "admin",
    "quiz-template",
    "detail",
    quizTemplateId,
  ],
};

export function useFetchAdminQuizTemplates(limit = 50) {
  return useInfiniteQuery({
    initialPageParam: undefined as number | undefined,
    queryKey: ADMIN_QUIZ_TEMPLATE_KEYS.list(limit),
    queryFn: ({ pageParam: cursor }) =>
      fetchAdminQuizTemplates({ cursor, limit }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext || lastPage.quizTemplates.length === 0) {
        return undefined;
      }

      return lastPage.quizTemplates[lastPage.quizTemplates.length - 1]
        .quizTemplateId;
    },
    select: (data) => data.pages.flatMap((page) => page.quizTemplates),
    retry: false,
  });
}

export function useFetchAdminQuizTemplate(quizTemplateId: number) {
  return useQuery({
    queryKey: ADMIN_QUIZ_TEMPLATE_KEYS.detail(quizTemplateId),
    queryFn: () => fetchAdminQuizTemplate({ quizTemplateId }),
    enabled: quizTemplateId > 0,
    retry: false,
  });
}

export function useCreateQuizTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuizTemplate,
    onSuccess: (quizTemplate) => {
      queryClient.setQueryData(
        ADMIN_QUIZ_TEMPLATE_KEYS.detail(quizTemplate.quizTemplateId),
        quizTemplate,
      );
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUIZ_TEMPLATE_KEYS.lists,
      });
      queryClient.invalidateQueries({ queryKey: QUIZ_TEMPLATE_KEYS.lists });
    },
  });
}

export function useUpdateQuizTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuizTemplate,
    onSuccess: (quizTemplate, { quizTemplateId }) => {
      queryClient.setQueryData(
        ADMIN_QUIZ_TEMPLATE_KEYS.detail(quizTemplateId),
        quizTemplate,
      );
      queryClient.setQueryData(
        QUIZ_TEMPLATE_KEYS.detail(quizTemplateId),
        quizTemplate,
      );
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUIZ_TEMPLATE_KEYS.lists,
      });
      queryClient.invalidateQueries({ queryKey: QUIZ_TEMPLATE_KEYS.lists });
    },
  });
}

export function useDeleteQuizTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuizTemplate,
    onSuccess: (_, { quizTemplateId }) => {
      queryClient.removeQueries({
        queryKey: ADMIN_QUIZ_TEMPLATE_KEYS.detail(quizTemplateId),
      });
      queryClient.removeQueries({
        queryKey: QUIZ_TEMPLATE_KEYS.detail(quizTemplateId),
      });
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUIZ_TEMPLATE_KEYS.lists,
      });
      queryClient.invalidateQueries({ queryKey: QUIZ_TEMPLATE_KEYS.lists });
    },
  });
}
