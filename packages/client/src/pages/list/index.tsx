import Fetcher from '@/api/fetcher';
import useMeasuredRef from '@/hooks/useMeasuredRef';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import Logic from './Item';

interface ILogic {
  _id: string;
  title: string;
  authorId: string;
  size: number;
  timeLimit: number;
}

const pageSize = 10;

// 리팩토링? 테스트?

const List = () => {
  const [target, setRef] = useMeasuredRef<HTMLDivElement>();
  const intersectionObserverRef = useRef<IntersectionObserver>();

  const { data, isError, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ILogic[]>(
      ['logicList', pageSize],
      ({ pageParam = 0 }) => {
        return new Fetcher('/logic')
          .setQuery({ pageIndex: pageParam, pageSize })
          .get();
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.length < pageSize) return;
          return allPages.length;
        },
      },
    );

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

  if (isError || isLoading || !data) return null;
  const logics = data.pages.flat();

  return (
    <>
      <h1>로직 목록</h1>
      <div
        style={{
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        {logics.map((logic) => (
          <Logic
            key={logic._id}
            data={logic}
          />
        ))}
      </div>

      <div ref={setRef} />
    </>
  );
};

export default List;
