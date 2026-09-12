import { create, deleteQuizTemplate, getQuizTemplate, getQuizTemplates, update } from "@/api/admin-quiz-template.api";
import { QUIZ_TEMPLATE_KEYS } from "./quiz-template.queries";


import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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

export function useGetQuizTemplates(limit = 50) {
  return useInfiniteQuery({
    initialPageParam: undefined as number | undefined,
    queryKey: ADMIN_QUIZ_TEMPLATE_KEYS.list(limit),
    queryFn: ({ pageParam: cursor }) => getQuizTemplates({ cursor, limit }),
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

export function useGetQuizTemplate(quizTemplateId: number) {
  return useQuery({
    queryKey: ADMIN_QUIZ_TEMPLATE_KEYS.detail(quizTemplateId),
    queryFn: () => getQuizTemplate({ quizTemplateId }),
    enabled: quizTemplateId > 0,
    retry: false,
  });
}

export function useCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
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

export function useUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: update,
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

export function useDelete() {
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
