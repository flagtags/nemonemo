import Fetcher from '@/api/fetcher';
import { useQuery } from 'react-query';

const List = () => {
  const pageIndex = 0;
  const pageSize = 10;

  const { isLoading, isError, data } = useQuery(
    ['logicList', pageIndex, pageSize],
    new Fetcher('/logic').setQuery({ pageIndex: 0, pageSize: 10 }).get,
  );

  return <h1>로직 목록</h1>;
};

export default List;
