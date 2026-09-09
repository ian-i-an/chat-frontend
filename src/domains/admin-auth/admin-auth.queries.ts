import { logout, signIn } from "./admin-auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["admin", "statistics"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["admin"] });
      navigate("/admin/sign-in", { replace: true });
    },
  });
}
