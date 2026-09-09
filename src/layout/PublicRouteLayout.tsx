import Loader from "@/components/common/Loader";
import { useGetMe } from "@/domains/user/user.queries";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRouteLayout() {
  const { data: myProfile, isError, isLoading } = useGetMe();

  if (isLoading) {
    return <Loader fullPage />;
  }

  if (myProfile && !isError) {
    return <Navigate to="/rooms" replace />;
  }

  return <Outlet />;
}
