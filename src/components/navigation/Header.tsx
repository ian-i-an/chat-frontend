import { Link } from "react-router-dom";

import MenuButton from "./MenuButton";
import ProfileButton from "./ProfileButton";
import { useFetchMyProfile } from "@/hooks/use-auth";

export default function Header() {
  const { data: myProfile } = useFetchMyProfile();

  return (
    <header className="w-full px-4 py-3">
      <div className="flex w-full min-w-64 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MenuButton isAuthenticated={!!myProfile} />

          <Link
            to="/"
            className="cursor-pointer text-xl font-black tracking-tight whitespace-nowrap text-blue-500 transition-opacity hover:opacity-80"
          >
            첨벙
          </Link>
        </div>

        {myProfile ? (
          <ProfileButton />
        ) : (
          <Link
            to="/sign-in"
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-400 active:bg-blue-400"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
