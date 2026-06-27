import { Outlet } from "react-router-dom";

export default function CardLayout() {
  return (
    <div className="flex  h-full  flex-col items-center justify-center bg-gray-100 p-4">
      {/* 액션 박스, 최대 크기랑 최소 크기를 지정해줌*/}
      <div className="flex w-full max-w-sm min-w-75 flex-col rounded-2xl bg-white px-6 pt-12 pb-6 shadow-sm">
        <Outlet />
      </div>
    </div>
  );
}
