import { deleteAccount, updateNickname } from "@/api/user";
import { stompClient } from "@/websocket/websocket-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { USER_KEYS } from "./useAuth";

export function useDeleteAccount() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
      localStorage.removeItem("isSignedIn");
      queryClient.clear();

      navigate("/sign-in", { replace: true });
    },
  });
}

export function useUpdateNickname() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNickname,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(USER_KEYS.me, updatedUser);
    },
  });
}
