import {
  createQuiz,
  delete as deleteQuiz,
  getQuiz,
  getQuizzesByUser,
  updateQuiz,
  updateQuizMetadata,
} from "./quiz.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const QUIZ_KEYS = {
  all: ["quiz"],
  list: ["quiz", "list"],
  byCode: (code: string) => ["quiz", "byCode", code],
};

export function useGetQuizzesByUser(enabled = true) {
  return useQuery({
    queryKey: QUIZ_KEYS.list,
    queryFn: getQuizzesByUser,
    enabled,
  });
}

export function useGetQuiz(code: string) {
  return useQuery({
    queryKey: QUIZ_KEYS.byCode(code),
    queryFn: () => getQuiz({ code }),
    enabled: !!code,
  });
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUIZ_KEYS.list });
    },
  });
}

export function useUpdateQuizMetadata() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuizMetadata,
    onSuccess: (quiz, { code }) => {
      queryClient.setQueryData(QUIZ_KEYS.byCode(code), quiz);
      return queryClient.invalidateQueries({ queryKey: QUIZ_KEYS.list });
    },
  });
}

export function useUpdateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuiz,
    onSuccess: (quiz, { code }) => {
      queryClient.setQueryData(QUIZ_KEYS.byCode(code), quiz);
      return queryClient.invalidateQueries({ queryKey: QUIZ_KEYS.list });
    },
  });
}

export function useDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuiz,
    onSuccess: (_, { code }) => {
      queryClient.removeQueries({ queryKey: QUIZ_KEYS.byCode(code) });
      return queryClient.invalidateQueries({ queryKey: QUIZ_KEYS.list });
    },
  });
}
