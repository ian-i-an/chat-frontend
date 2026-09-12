import Fallback from "@/components/common/Fallback";
import Loader from "@/components/common/Loader";
import { useGetUserStatistics } from "@/queries/admin-statistics.queries";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRouteLayout() {
  const { isLoading, isError, error, refetch } = useGetUserStatistics();

  if (isLoading) {
    return <Loader fullPage />;
  }

  if (isError) {
    const status = error instanceof Error ? error.cause : undefined;

    if (status === 401 || status === 403) {
      return <Navigate to="/admin/sign-in" replace />;
    }

    return <Fallback onRetry={() => refetch()} />;
  }

  return <Outlet />;
}
