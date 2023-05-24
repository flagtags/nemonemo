import Fetcher from '@/api/fetcher';
import options from '@/config/reactQuery/options';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Logic from './Item';

interface ILogic {
  _id: string;
  title: string;
  authorId: string;
  size: number;
  timeLimit: number;
}

const pageSize = 10;

const List = () => {
  const {
    setRef,
    data: logics,
    isLoading,
  } = useInfiniteScroll<ILogic>(
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
        {!isLoading && logics
          ? logics.map((logic) => (
              <Logic
                key={logic._id}
                data={logic}
              />
            ))
          : null}
      </div>

      <div ref={setRef} />
    </>
  );
};

export default List;
