import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../common/Sidebar";
import IconButton from "../common/IconButton";

interface MenuButtonProps {
  isAuthenticated: boolean;
}

export default function MenuButton({ isAuthenticated }: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)}>
        <Menu className="h-6 w-6" />
      </IconButton>

      <Sidebar
        isOpen={isOpen}
        isAuthenticated={isAuthenticated}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
