import { Outlet } from "react-router-dom";

export default function CardLayout() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      {/* 액션 박스, 최대 크기랑 최소 크기를 지정해줌*/}
      <div className="flex w-full max-w-sm min-w-75 flex-col rounded-2xl border border-gray-200/50 bg-white px-6 pt-12 pb-6 shadow-sm">
        <Outlet />
      </div>
    </div>
  );
}
