import Header from "@/components/navigation/Header";
import { Outlet } from "react-router-dom";

export default function NavigationLayout() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header />

      <Outlet />
    </div>
  );
}
