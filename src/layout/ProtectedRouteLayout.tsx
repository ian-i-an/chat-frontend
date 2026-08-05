import { Navigate, Outlet } from "react-router-dom";
import { useFetchMyProfile } from "@/hooks/use-auth";
import Loader from "@/components/common/Loader";

export default function ProtectedRouteLayout() {
  const { data: myProfile, isLoading: isFetchMyProfileLoading } =
    useFetchMyProfile();

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
