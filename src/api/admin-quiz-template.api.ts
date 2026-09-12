import type { QuizTemplateCreateInfo, QuizTemplateCursor, QuizTemplateCursorResponse, QuizTemplateDto, QuizTemplateUpdateInfo } from "@/domain/quiz.type";


const ENDPOINT = "/api/admin/quiz-templates";
const API_URL = import.meta.env.VITE_API_URL;

export const getQuizTemplates = async ({
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

export const getQuizTemplate = async ({
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

export const create = async (
  createInfo: QuizTemplateCreateInfo,
): Promise<QuizTemplateDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createInfo),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const update = async ({
  quizTemplateId,
  quizTemplateUpdateInfo,
}: {
  quizTemplateId: number;
  quizTemplateUpdateInfo: QuizTemplateUpdateInfo;
}): Promise<QuizTemplateDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${quizTemplateId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizTemplateUpdateInfo),
  });

 if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const deleteQuizTemplate = async ({
  quizTemplateId,
}: {
  quizTemplateId: number;
}): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${quizTemplateId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};

