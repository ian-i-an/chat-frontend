import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "@/domains/auth/auth";
import { useNavigate } from "react-router-dom";

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
