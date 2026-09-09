import Loader from "@/components/common/Loader";
import { useFetchMyProfile } from "@/domains/auth/use-auth";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRouteLayout() {
  const { data: myProfile, isError, isLoading } = useFetchMyProfile();

  if (isLoading) {
    return <Loader fullPage />;
  }

  if (myProfile && !isError) {
    return <Navigate to="/rooms" replace />;
  }

  return <Outlet />;
}
