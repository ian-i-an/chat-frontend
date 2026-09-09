import {
  fetchQuizStatistics,
  fetchRoomStatistics,
  fetchUserStatistics,
} from "@/domains/api/admin-statistics";
import { useQuery } from "@tanstack/react-query";

export const ADMIN_STATISTICS_KEYS = {
  all: ["admin", "statistics"],
  users: ["admin", "statistics", "users"],
  rooms: ["admin", "statistics", "rooms"],
  quizzes: ["admin", "statistics", "quizzes"],
};

export function useFetchUserStatistics() {
  return useQuery({
    queryKey: ADMIN_STATISTICS_KEYS.users,
    queryFn: fetchUserStatistics,
    retry: false,
  });
}

export function useFetchRoomStatistics() {
  return useQuery({
    queryKey: ADMIN_STATISTICS_KEYS.rooms,
    queryFn: fetchRoomStatistics,
    retry: false,
  });
}

export function useFetchQuizStatistics() {
  return useQuery({
    queryKey: ADMIN_STATISTICS_KEYS.quizzes,
    queryFn: fetchQuizStatistics,
    retry: false,
  });
}
