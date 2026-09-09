import { signInAdmin, signOutAdmin } from "@/domains/api/admin-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useSignInAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signInAdmin,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["admin", "statistics"] });
    },
  });
}

export function useSignOutAdmin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signOutAdmin,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["admin"] });
      navigate("/admin/sign-in", { replace: true });
    },
  });
}
