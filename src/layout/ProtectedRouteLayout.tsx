import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useFetchMyProfile } from "@/hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Loader from "@/components/common/Loader";
import { toast } from "sonner";
import type { ErrorResponse } from "@/types/types";

export default function ProtectedRouteLayout() {
  const { data: myProfile, isLoading: isFetchMyProfileLoading } =
    useFetchMyProfile();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const handleTokenExpired = (event: Event) => {
      const errorResponse = (event as CustomEvent<ErrorResponse | undefined>)
        .detail;
      toast.error(errorResponse?.message ?? "로그인 후 이용 가능합니다.");

      queryClient.clear();

      navigate("/sign-in", { replace: true });
    };

    window.addEventListener("token-expired", handleTokenExpired);

    return () => {
      window.removeEventListener("token-expired", handleTokenExpired);
    };
  }, [queryClient, navigate]);

  if (isFetchMyProfileLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!myProfile) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
