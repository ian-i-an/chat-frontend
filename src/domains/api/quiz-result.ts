import type {
  GradeResultResponse,
  QuizSubmission,
} from "@/domains/types/types";

const ENDPOINT = "/api/quizzes";
const API_URL = import.meta.env.VITE_API_URL;

export const gradeQuiz = async ({
  code,
  quizSubmission,
}: {
  code: string;
  quizSubmission: QuizSubmission;
}): Promise<GradeResultResponse> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${code}/results`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizSubmission),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const fetchQuizRanking = async ({
  code,
}: {
  code: string;
}): Promise<GradeResultResponse[]> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${code}/results`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const deleteQuizResult = async ({
  code,
  quizResultId,
}: {
  code: string;
  quizResultId: number;
}): Promise<void> => {
  const response = await fetch(
    `${API_URL}${ENDPOINT}/${code}/results/${quizResultId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};
