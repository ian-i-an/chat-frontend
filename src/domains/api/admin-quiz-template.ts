import type {
  QuizTemplateCursor,
  QuizTemplateCursorResponse,
  QuizTemplateCreateInfo,
  QuizTemplateDto,
  QuizTemplateUpdateInfo,
} from "@/domains/types/types";

const ENDPOINT = "/api/admin/quiz-templates";
const API_URL = import.meta.env.VITE_API_URL;

export const fetchAdminQuizTemplates = async ({
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
    throw new Error(error.message, { cause: response.status });
  }

  return response.json();
};

export const fetchAdminQuizTemplate = async ({
  quizTemplateId,
}: {
  quizTemplateId: number;
}): Promise<QuizTemplateDto> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/${quizTemplateId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message, { cause: response.status });
  }

  return response.json();
};

export const createQuizTemplate = async (
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
    throw new Error(error.message, { cause: response.status });
  }

  return response.json();
};

export const updateQuizTemplate = async ({
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
    throw new Error(error.message, { cause: response.status });
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
    throw new Error(error.message, { cause: response.status });
  }
};
