import { Link } from "react-router-dom";

import ProfileButton from "./ProfileButton";
import { useGetMe } from "@/queries/user.queries";
import IconButton from "../common/IconButton";
import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function NavBar() {
  const { data: myProfile, isError } = useGetMe();
  const isAuthenticated = !!myProfile && !isError;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-surface px-4 py-2">
      <div className="flex  min-w-page-min items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <IconButton 
          onClick={() => setIsOpen(true)}
          className="text-subtle-foreground hover:bg-subtle-background"
          >
        <Menu className="h-6 w-6" />
      </IconButton>

      <Sidebar
        isOpen={isOpen}
        isAuthenticated={isAuthenticated}
        onClose={() => setIsOpen(false)}
      />

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
