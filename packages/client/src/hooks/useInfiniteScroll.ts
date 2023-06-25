import { useEffect, useRef } from 'react';
import {
  QueryFunction,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from 'react-query';
import useMeasuredRef from './useMeasuredRef';

const useInfiniteScroll = <T>(
  queryKeys: QueryKey,
  queryFn: QueryFunction<T[], QueryKey>,
  queryOptions: Omit<
    UseInfiniteQueryOptions<T[], unknown, T[], T[], QueryKey>,
    'queryKey' | 'queryFn'
  > = {},
  flatFn: (data: T[][]) => T[],
) => {
  const [target, setRef] = useMeasuredRef<HTMLDivElement>();
  const intersectionObserverRef = useRef<IntersectionObserver>();

  const { data, isLoading, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery<T[]>(queryKeys, queryFn, queryOptions);

  if (!hasNextPage && target) {
    intersectionObserverRef.current?.unobserve(target);
  }

  useEffect(() => {
    if (!target) return;
    const intersectionHandler = async (
      entries: IntersectionObserverEntry[],
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) fetchNextPage();
      });
    };

    intersectionObserverRef.current =
      intersectionObserverRef.current ||
      new IntersectionObserver(intersectionHandler);

    intersectionObserverRef.current.observe(target);

    return () => {
      if (!intersectionObserverRef.current) return;
      intersectionObserverRef.current.unobserve(target);
    };
  }, [target]);

  const flattenData = (data && flatFn(data.pages)) || [];

  return { setRef, data: flattenData, isLoading };
};

export default useInfiniteScroll;
