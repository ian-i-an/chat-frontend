import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultProfile from "@/assets/default-profile.png";
import { useLogout } from "@/queries/auth.queries";
import PhotoButton from "../common/PhotoButton";
import { LogOut, User } from "lucide-react";

export default function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { mutate: logout } = useLogout();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <PhotoButton onClick={() => setIsOpen(!isOpen)}>
        <img
          src={defaultProfile}
          alt="유저의 프로필 사진"
          width={32}
          height={32}
          className="object-cover"
        />
      </PhotoButton>

      {isOpen && (
        <div className="text-foreground glass absolute top-full right-0 z-20 mt-2 flex w-44 flex-col overflow-hidden rounded-2xl p-1.5 text-sm font-bold">
          <Link
            to={`/profile`} // 프로필 페이지 경로
            onClick={() => setIsOpen(false)}
            className="glass-hover flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
          >
            <User className="text-primary h-4.5 w-4.5" />
            프로필
          </Link>

          <button
            onClick={handleSignOut}
            className="text-danger glass-hover flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors"
          >
            <LogOut className="h-4.5 w-4.5" />
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
