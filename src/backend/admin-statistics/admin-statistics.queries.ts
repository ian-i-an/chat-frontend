import {
  getQuizStatistics,
  getRoomStatistics,
  getUserStatistics,
} from "./admin-statistics.api";
import { useQuery } from "@tanstack/react-query";

export const ADMIN_STATISTICS_KEYS = {
  all: ["admin", "statistics"],
  users: ["admin", "statistics", "users"],
  rooms: ["admin", "statistics", "rooms"],
  quizzes: ["admin", "statistics", "quizzes"],
};

export function useGetUserStatistics() {
  return useQuery({
    queryKey: ADMIN_STATISTICS_KEYS.users,
    queryFn: getUserStatistics,
    retry: false,
  });
}

export function useGetRoomStatistics() {
  return useQuery({
    queryKey: ADMIN_STATISTICS_KEYS.rooms,
    queryFn: getRoomStatistics,
    retry: false,
  });
}

export function useGetQuizStatistics() {
  return useQuery({
    queryKey: ADMIN_STATISTICS_KEYS.quizzes,
    queryFn: getQuizStatistics,
    retry: false,
  });
}
