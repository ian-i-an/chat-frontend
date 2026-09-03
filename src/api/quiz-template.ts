import type {
  QuizTemplateCursor,
  QuizTemplateCursorResponse,
  QuizTemplateDto,
} from "@/types/types";

const ENDPOINT = "/api/quiz-templates";
const API_URL = import.meta.env.VITE_API_URL;

export const fetchQuizTemplates = async ({
  cursor,
  limit,
}: QuizTemplateCursor): Promise<QuizTemplateCursorResponse> => {
  const params = new URLSearchParams({ limit: String(limit) });

  if (cursor !== undefined) {
    params.set("cursor", String(cursor));
  }

  const response = await fetch(`${API_URL}${ENDPOINT}?${params}`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const fetchQuizTemplate = async ({
  quizTemplateId,
}: {
  quizTemplateId: number;
}): Promise<QuizTemplateDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${quizTemplateId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};
