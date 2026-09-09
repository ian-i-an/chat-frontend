import type {
  QuizCreateInfo,
  QuizDto,
  QuizMetadataUpdateInfo,
  QuizUpdateInfo,
} from "@/domains/types/types";

const ENDPOINT = "/api/quizzes";
const API_URL = import.meta.env.VITE_API_URL;

export const createQuiz = async (
  quizCreateInfo: QuizCreateInfo,
): Promise<QuizDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizCreateInfo),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const fetchQuizzesByUser = async (): Promise<QuizDto[]> => {
  const response = await fetch(`${API_URL}${ENDPOINT}`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const fetchQuiz = async ({
  code,
}: {
  code: string;
}): Promise<QuizDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${code}`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const updateQuizMetadata = async ({
  code,
  quizMetadataUpdateInfo,
}: {
  code: string;
  quizMetadataUpdateInfo: QuizMetadataUpdateInfo;
}): Promise<QuizDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${code}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizMetadataUpdateInfo),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const updateQuiz = async ({
  code,
  quizUpdateInfo,
}: {
  code: string;
  quizUpdateInfo: QuizUpdateInfo;
}): Promise<QuizDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${code}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizUpdateInfo),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const deleteQuiz = async ({ code }: { code: string }): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${code}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};
