import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultProfile from "@/assets/default-profile.png";
import { useSignOut } from "@/hooks/useAuth";

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
    <div className="relative " ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" shrink-0 cursor-pointer overflow-hidden  rounded-full border focus-visible:ring-2 focus:outline-none focus-visible:ring-blue-500 border-gray-100 transition-opacity hover:opacity-80"
      >
        <img
          src={defaultProfile}
          alt="유저의 프로필 사진"
          width={32}
          height={32}
          className="object-cover"
        />
      </button>

      {isOpen && (
        <div className=" z-11 absolute font-semibold right-0 text-gray-700 text-sm top-full  mt-2 flex w-40 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
          <Link
            to={`/profile`} // 프로필 페이지 경로
            onClick={() => setIsOpen(false)} // PopoverClose 역할
            className="rounded-xl cursor-pointer px-4 py-3 transition-colors hover:bg-gray-100"
          >
            프로필
          </Link>

          <button
            onClick={handleSignOut}
            className="rounded-xl w-full cursor-pointer px-4 py-3 text-left  text-red-600 transition-colors hover:bg-gray-100"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
