import {
  Home,
  ListChecks,
  LogIn,
  LogOut,
  MessageCircle,
  User,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import IconButton from "../common/IconButton";
import { useLogout } from "@/queries/admin-auth.queries";


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
  const { mutate: logout } = useLogout();

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
    logout();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "" : "invisible opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`glass fixed top-0 left-0 z-50 flex h-full w-72 max-w-[82vw] flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            to="/"
            onClick={onClose}
            className="text-primary text-xl font-black tracking-tight"
          >
            첨벙
          </Link>
          <IconButton 
          onClick={onClose}
          className="text-subtle-foreground hover:bg-subtle-background">
            <X className="h-5 w-5" />
          </IconButton>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          <Link
            to="/"
            onClick={onClose}
            className="glass-hover flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 transition-colors"
          >
            <Home className="text-primary h-4.5 w-4.5" /> 홈
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/rooms"
                onClick={onClose}
                className="glass-hover flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 transition-colors"
              >
                <MessageCircle className="text-primary h-4.5 w-4.5" />
                채팅방
              </Link>
              <Link
                to="/profile"
                onClick={onClose}
                className="glass-hover flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 transition-colors"
              >
                <User className="text-primary h-4.5 w-4.5" />내 프로필
              </Link>
              <Link
                to="/quizzes"
                onClick={onClose}
                className="glass-hover flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 transition-colors"
              >
                <ListChecks className="h-4.5 w-4.5 text-emerald-500" />
                퀴즈
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="text-danger glass-hover flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition-colors"
              >
                <LogOut className="h-4.5 w-4.5" />
                로그아웃
              </button>
            </>
          ) : (
            <Link
              to="/sign-in"
              onClick={onClose}
              className="glass-hover flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 transition-colors"
            >
              <LogIn className="text-primary h-4.5 w-4.5" />
              로그인
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}
