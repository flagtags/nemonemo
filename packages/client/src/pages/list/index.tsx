import Fetcher from '@/api/fetcher';
import options from '@/config/reactQuery/options';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { IBoard } from '@/types/logic';
import Logic from './Item';

const pageSize = 10;

const List = () => {
  console.log('list component');
  const {
    setRef,
    data: logics,
    isLoading,
  } = useInfiniteScroll<IBoard>(
    ['logicList', pageSize],
    ({ pageParam = 0 }) => {
      try {
        return new Fetcher('/logic')
          .setQuery({ pageIndex: pageParam, pageSize })
          .get();
      } catch (error) {
        console.log('useInfiniteScroll fetch function error', error);
        throw error;
      }
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < pageSize) return;
        return allPages.length;
      },
      ...options,
    },
    (data) => data.flat(),
  );

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
