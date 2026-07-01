import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultProfile from "@/assets/default-profile.png";
import { useSignOut } from "@/hooks/use-auth";
import PhotoButton from "../common/PhotoButton";

export default function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { mutate: SignOut } = useSignOut();

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
    SignOut();
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
        <div className="absolute right-0 top-full z-20 mt-2 flex w-40 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white py-1 text-sm font-semibold text-gray-700 shadow-lg">
          <Link
            to={`/profile`} // 프로필 페이지 경로
            onClick={() => setIsOpen(false)}
            className="rounded-xl cursor-pointer px-4 py-3 transition-colors hover:bg-gray-100 active:bg-gray-100"
          >
            프로필
          </Link>

          <button
            onClick={handleSignOut}
            className="rounded-xl w-full cursor-pointer px-4 py-3 text-left  text-red-600 transition-colors hover:bg-gray-100 active:bg-gray-100"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
