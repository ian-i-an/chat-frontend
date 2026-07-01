import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type UseChatListParams = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<{ hasNextPage?: boolean }>;
};

export function useChatNext({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseChatListParams) {
  const { ref: topObserverRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    topObserverRef,
  };
}
