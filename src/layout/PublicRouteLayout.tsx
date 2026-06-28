import Loader from "@/components/common/Loader";
import { useFetchMyProfile } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRouteLayout() {
  const { data: myProfile, isLoading } = useFetchMyProfile();

  if (isLoading) {
    return <Loader fullPage />;
  }

  if (myProfile) {
    return <Navigate to="/rooms" replace />;
  }

  return <Outlet />;
}
