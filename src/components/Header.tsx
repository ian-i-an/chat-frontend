import { Link } from "react-router-dom";
import ProfileButton from "./profileButton";
import SidebarButton from "./SidebarButton";

export default function Header() {
  const isSignedIn = localStorage.getItem("isSignedIn");

  return (
    <header className="flex h-16 w-full min-w-64 items-center justify-between gap-4 border-b border-gray-100 bg-white px-4 shadow-sm">
      <SidebarButton />

      <Link
        to="/chat-rooms"
        className="cursor-pointer text-lg font-black tracking-tight whitespace-nowrap text-blue-500 transition-opacity hover:opacity-80"
      >
        Anonymous Chat
      </Link>

      {isSignedIn ? (
        <ProfileButton />
      ) : (
        <Link
          to="/sign-in"
          className="rounded-xl bg-blue-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-400"
        >
          로그인
        </Link>
      )}
    </header>
  );
}
