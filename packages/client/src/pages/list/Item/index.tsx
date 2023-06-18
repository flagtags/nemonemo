import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface ILogic {
  _id: string;
  title: string;
  authorId: string;
  size: number;
  timeLimit: number;
}

const Logic = ({ data }: { data: ILogic }) => {
  const { title, authorId, size, timeLimit } = data;
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!ref.current) return;
  });

  return (
    <Link
      to={`/game/${data._id}`}
      ref={ref}
      role={'logicListItem'}
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        border: '1px solid grey',
        padding: '15px',
        alignItems: 'center',
        alignSelf: 'center',
        width: '780px',
        marginBottom: '10px',
        justifyContent: 'space-between',
      }}
    >
      <h2>{title}</h2>

      <div>
        <h5>author: {authorId}</h5>

        <h5>size: {size}</h5>
        <h5>time: {timeLimit}</h5>
      </div>
    </Link>
  );
};

export default Logic;
