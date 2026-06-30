import { type ReactNode } from "react";

export default function BottomSheet({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 duration-300 backdrop-blur-xs"
        onClick={() => {
          onClose();
        }}
      />

      <div
        className="animate-slide-up fixed inset-x-0 bottom-0 
      z-50 mx-auto flex max-h-[90dvh] w-full max-w-sm flex-col rounded-t-3xl
      duration-300
       bg-white shadow-2xl"
      >
        {children}
      </div>
    </>
  );
}
