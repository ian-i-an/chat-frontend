import {
  deleteQuizResult,
  fetchQuizRanking,
  gradeQuiz,
} from "@/domains/api/quiz-result";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const QUIZ_RESULT_KEYS = {
  all: ["quiz-result"],
  ranking: (code: string) => ["quiz-result", code, "ranking"],
};

export function useFetchQuizRanking(code: string) {
  return useQuery({
    queryKey: QUIZ_RESULT_KEYS.ranking(code),
    queryFn: () => fetchQuizRanking({ code }),
    enabled: !!code,
  });
}

export function useGradeQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gradeQuiz,
    onSuccess: (_, { code }) => {
      return queryClient.invalidateQueries({
        queryKey: QUIZ_RESULT_KEYS.ranking(code),
      });
    },
  });
}

export function useDeleteQuizResult() {
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
