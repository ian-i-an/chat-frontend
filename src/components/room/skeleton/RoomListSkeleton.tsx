import RoomItemSkeleton from "./RoomItemSkeleton";

export default function RoomListSkeleton({ count }: { count: number }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-4 pt-5 pb-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="h-8 w-20 rounded-lg bg-gray-100" />
          <div className="mt-2 h-4 w-28 rounded bg-gray-100" />
        </div>
        <div className="h-10 w-18 rounded-full bg-gray-100" />
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {new Array(count).fill(0).map((_, idx) => (
          <RoomItemSkeleton
            key={`room-item-skeleton-${idx}`}
            hasDivider={idx < count - 1}
          />
        ))}
      </div>
    </div>
  );
}
