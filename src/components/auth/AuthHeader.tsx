export default function AuthHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center gap-1">
      <h1 className="text-2xl font-black tracking-tight text-blue-500">
        {title}
      </h1>
      <p className="text-sm font-medium text-gray-400">{description}</p>
    </div>
  );
}
