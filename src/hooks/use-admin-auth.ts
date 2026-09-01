import { signInAdmin } from "@/api/admin-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSignInAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signInAdmin,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["admin", "statistics"] });
    },
  });
}
