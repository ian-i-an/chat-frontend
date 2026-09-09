import { delete as deleteQuizResult, grade, ranking } from "./quiz-result.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const QUIZ_RESULT_KEYS = {
  all: ["quiz-result"],
  ranking: (code: string) => ["quiz-result", code, "ranking"],
};

export function useRanking(code: string) {
  return useQuery({
    queryKey: QUIZ_RESULT_KEYS.ranking(code),
    queryFn: () => ranking({ code }),
    enabled: !!code,
  });
}

export function useGrade() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: grade,
    onSuccess: (_, { code }) => {
      return queryClient.invalidateQueries({
        queryKey: QUIZ_RESULT_KEYS.ranking(code),
      });
    },
  });
}

export function useDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuizResult,
    onSuccess: (_, { code }) => {
      return queryClient.invalidateQueries({
        queryKey: QUIZ_RESULT_KEYS.ranking(code),
      });
    },
  });
}
