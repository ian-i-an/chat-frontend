import { deleteAccount, updateNickname } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { USER_KEYS } from "./use-auth";

export function useDeleteAccount() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
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
