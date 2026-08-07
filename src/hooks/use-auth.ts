import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  signIn,
  signOut,
} from "@/api/auth";
import { fetchMyProfile, checkIdDuplication,signUp } from "@/api/user";
import { useNavigate } from "react-router-dom";

export const USER_KEYS = {
  all: ["user"],
  me: ["user", "me"],
  list: ["user", "list"],
  byId: (userId: number) => ["user", "byId", userId],
};

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (userData) => {
      queryClient.setQueryData(USER_KEYS.me, userData);
    },
  });
}

export function useCheckId() {
  return useMutation({
    mutationFn: checkIdDuplication,
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: signUp
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
