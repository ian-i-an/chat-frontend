import { Navigate, Outlet } from "react-router-dom";
import { useFetchMyProfile } from "@/hooks/use-auth";
import Loader from "@/components/common/Loader";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ProtectedRouteLayout() {
  const {
    data: myProfile,
    isLoading: isFetchMyProfileLoading,
    error,
    isError,
  } = useFetchMyProfile();

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  if (isFetchMyProfileLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError || !myProfile) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
