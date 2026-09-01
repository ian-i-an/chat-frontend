import type {
  QuizStatistics,
  RoomStatistics,
  UserStatistics,
} from "@/types/types";

const ENDPOINT = "/api/admin/statistics";
const API_URL = import.meta.env.VITE_API_URL;

export const fetchUserStatistics = async (): Promise<UserStatistics> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/users`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message, { cause: response.status });
  }

  return response.json();
};

export const fetchRoomStatistics = async (): Promise<RoomStatistics> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/rooms`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message, { cause: response.status });
  }

  return response.json();
};

export const fetchQuizStatistics = async (): Promise<QuizStatistics> => {
  const response = await fetch(`${API_URL}${ENDPOINT}/quizzes`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message, { cause: response.status });
  }

  return response.json();
};
