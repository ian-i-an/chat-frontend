
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout, signIn } from "../api/admin-auth.api";

export const ADMIN_KEY = {
  all: ["admin"],
  me: ["admin", "me"],
  statistics: ["admin", "statistics"]
};

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
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
