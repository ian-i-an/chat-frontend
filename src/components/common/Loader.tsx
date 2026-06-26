import { LoaderCircleIcon } from "lucide-react";

export default function Loader({ fullPage = false }: { fullPage?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center text-gray-400 ${fullPage ? "h-screen" : "h-full"}`}
    >
      <LoaderCircleIcon className="h-6 w-6 animate-spin" />
    </div>
  );
}
