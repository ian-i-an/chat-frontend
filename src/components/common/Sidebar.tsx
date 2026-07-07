import {
  Home,
  LogIn,
  LogOut,
  MessageCircle,
  User,
  UserPlus,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import IconButton from "./IconButton";
import { useSignOut } from "@/hooks/use-auth";

interface SidebarProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  onClose: () => void;
}

export default function Sidebar({
  isOpen,
  isAuthenticated,
  onClose,
}: SidebarProps) {
  const { mutate: signOut } = useSignOut();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSignOut = () => {
    onClose();
    signOut();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "" : "invisible opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 z-50 flex h-full w-72 max-w-[82vw] flex-col bg-white/80 shadow-2xl backdrop-blur-xs transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            to="/"
            onClick={onClose}
            className="text-xl font-black tracking-tight text-blue-500"
          >
            첨벙
          </Link>
          <IconButton onClick={onClose}>
            <X className="h-4 w-4" />
          </IconButton>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-white/50 active:bg-white/50"
          >
            <Home className="h-4.5 w-4.5 text-blue-500" /> 홈
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/rooms"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-white/50 active:bg-white/50"
              >
                <MessageCircle className="h-4.5 w-4.5 text-blue-500" />
                채팅방
              </Link>
              <Link
                to="/profile"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-white/50 active:bg-white/50"
              >
                <User className="h-4.5 w-4.5 text-blue-500" />내 프로필
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold text-red-500 transition-colors hover:bg-white/70 active:bg-white/70"
              >
                <LogOut className="h-4.5 w-4.5" />
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                to="/sign-in"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-white/50 active:bg-white/50"
              >
                <LogIn className="h-4.5 w-4.5 text-blue-500" />
                로그인
              </Link>
              <Link
                to="/sign-up"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-white/50 active:bg-white/50"
              >
                <UserPlus className="h-4.5 w-4.5 text-blue-500" />
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
