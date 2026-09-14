import NavBar from "@/components/navigation/NavBar";
import { Outlet } from "react-router-dom";

export default function NavigationLayout() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <NavBar />
      <Outlet />
    </div>
  );
}
