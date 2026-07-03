import RoomItemSkeleton from "./RoomItemSkeleton";

export default function RoomListSkeleton({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-5 px-4 pb-6">
      <div className="flex items-center justify-between border-b border-gray-100 py-6">
        <h2 className="text-base font-bold text-gray-800">내 채팅방 목록</h2>
        <div className="h-4 w-10 rounded bg-gray-100" />
      </div>
      {new Array(count).fill(0).map((_, idx) => (
        <RoomItemSkeleton key={`book-item-skeleton-${idx}`} />
      ))}
    </div>
  );
}
