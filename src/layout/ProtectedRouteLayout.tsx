import { Navigate, Outlet } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { useEffect } from "react";
import { toast } from "sonner";
import { useGetMe } from "@/domains/user/user.queries";

export default function ProtectedRouteLayout() {
  const {
    data: myProfile,
    isLoading: isFetchMyProfileLoading,
    error,
    isError,
  } = useGetMe();

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  if (isFetchMyProfileLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError || !myProfile) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
