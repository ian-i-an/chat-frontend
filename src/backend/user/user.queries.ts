import {
  deleteUser,
  getMe,
  register,
  updateUser,
} from "@/backend/user/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const USER_KEYS = {
  all: ["user"],
  me: ["user", "me"],
  list: ["user", "list"],
  byId: (userId: number) => ["user", "byId", userId],
};

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: (userData) => {
      queryClient.setQueryData(USER_KEYS.me, userData);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.clear();

      navigate("/sign-in", { replace: true });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(USER_KEYS.me, updatedUser);
    },
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: USER_KEYS.me,
    queryFn: getMe,
    // staleTime: 1000 * 60 * 30, // 30분
  });
}
