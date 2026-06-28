import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../common/Sidebar";
import IconButton from "../common/IconButton";

export default function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)}>
        <Menu className="h-6 w-6" />
      </IconButton>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
