export default function RoomItemSkeleton({
  hasDivider = false,
}: {
  hasDivider?: boolean;
}) {
  return (
    <div
      className={`flex h-20 w-full items-center gap-3 px-4 ${
        hasDivider ? "border-b border-gray-100" : ""
      }`}
    >
      <div className="h-11 w-11 rounded-full bg-gray-100" />
      <div className="min-w-0 flex-1">
        <div className="h-4 w-1/2 rounded bg-gray-100" />
        <div className="mt-2 h-3 w-3/4 rounded bg-gray-100" />
      </div>
    </div>
  );
}
