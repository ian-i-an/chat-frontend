import { X } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import IconButton from "./IconButton";

interface DialogProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Dialog({ title, onClose, children }: DialogProps) {
  const modalRoot = document.getElementById("modal-root") ?? document.body;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-xs"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        className="flex max-h-[85dvh] w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-gray-100 p-4">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <IconButton type="button" onClick={onClose}>
            <X className="h-4 w-4" />
          </IconButton>
        </header>

        {children}
      </section>
    </div>,
    modalRoot,
  );
}
