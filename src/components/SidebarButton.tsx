import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function SidebarButton() {
  const [isOpen, setIsOpen] = useState(false);
  const isSignedIn = localStorage.getItem("isSignedIn");

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
      >
        <Menu className="h-6 w-6" />
      </button>

      <Sidebar
        isSignedIn={isSignedIn}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
