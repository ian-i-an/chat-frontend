import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import IconButton from "./IconButton";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
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

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "" : "invisible opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 z-50 flex h-full w-64 flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
          <span className="text-base font-black tracking-tight text-gray-800">
            Menu
          </span>
          <IconButton onClick={onClose}>
            <X className="h-5 w-5" />
          </IconButton>
        </div>
        <nav className="flex flex-col gap-1">
          <>
            <Link
              to="/rooms"
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              채팅방 목록
            </Link>
            <Link
              to="/profile"
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              내 프로필
            </Link>

            <Link
              to="/sign-in"
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              로그인
            </Link>
            <Link
              to="/sign-up"
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              회원가입
            </Link>
          </>
        </nav>
      </div>
    </>
  );
}
