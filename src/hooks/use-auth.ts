import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signOut } from "@/api/auth";
import { fetchMyProfile, signUp } from "@/api/user";
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
    mutationFn: signUp,
    onSuccess: (userData) => {
      queryClient.setQueryData(USER_KEYS.me, userData);
    },
  });
}

export function useFetchMyProfile() {
  return useQuery({
    queryKey: USER_KEYS.me,
    queryFn: fetchMyProfile,
    // staleTime: 1000 * 60 * 30, // 30분
  });
}

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear();

      navigate("/sign-in", { replace: true });
    },
  });
};
