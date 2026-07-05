import Header from "@/components/navigation/Header";
import { Outlet } from "react-router-dom";

export default function NavigationLayout() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header />

      {/* <div className="flex flex-1 overflow-hidden bg-gray-100">
        <div className="mx-auto flex w-full max-w-md min-w-64 flex-1 flex-col overflow-hidden bg-white shadow-sm"> */}
      <Outlet />
      {/* </div>
      </div> */}
    </div>
  );
}
