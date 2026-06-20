import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  signIn,
  checkIdDuplication,
  signUp,
  fetchMyProfile,
  signOut,
} from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { stompClient } from "@/api/websocket-client";

export const USER_KEYS = {
  all: ["user"],
  me: ["user", "me"],
  list: ["user", "list"],
  byId: (userId: string) => ["user", "byId", userId],
};

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (userData) => {
      queryClient.setQueryData(USER_KEYS.me, userData);
      localStorage.setItem("isSignedIn", "true");
    },
  });
}

export function useCheckId() {
  return useMutation({
    mutationFn: checkIdDuplication,
  });
}

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
    staleTime: 1000 * 60 * 30, // 30분
  });
}

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
      localStorage.removeItem("isSignedIn");
      queryClient.clear();

      navigate("/sign-in", { replace: true });
    },
  });
};
