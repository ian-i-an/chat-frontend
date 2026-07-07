import { Link } from "react-router-dom";

export default function AuthHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-7">
      <Link
        to="/"
        className="w-fit text-xl font-black tracking-tight text-blue-500 transition-opacity hover:opacity-80"
      >
        첨벙
      </Link>

      <div className="text-center">
        <h1 className="text-2xl font-black tracking-tight text-gray-950">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-6 font-medium text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}
