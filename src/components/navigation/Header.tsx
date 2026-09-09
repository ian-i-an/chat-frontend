import { Link } from "react-router-dom";

import MenuButton from "./MenuButton";
import ProfileButton from "./ProfileButton";
import { useGetMe } from "@/domains/user/user.queries";

export default function Header() {
  const { data: myProfile, isError } = useGetMe();
  const isAuthenticated = !!myProfile && !isError;

  return (
    <header className="w-full px-4 py-3">
      <div className="flex w-full min-w-64 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MenuButton isAuthenticated={isAuthenticated} />

          <Link
            to="/"
            className="cursor-pointer text-xl font-black tracking-tight whitespace-nowrap text-primary transition-opacity hover:opacity-80"
          >
            첨벙
          </Link>
        </div>

        {isAuthenticated ? (
          <ProfileButton />
        ) : (
          <Link
            to="/sign-in"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-hover active:bg-primary-hover"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
