import { LoaderCircleIcon } from "lucide-react";

export default function Loader() {
  return (
    <div className="text-gray-400 flex  items-center justify-center ">
      <LoaderCircleIcon className="animate-spin h-6 w-6" />
    </div>
  );
}
