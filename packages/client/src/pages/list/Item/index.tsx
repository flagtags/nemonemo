interface ILogic {
  _id: string;
  title: string;
  authorId: string;
  size: number;
  timeLimit: number;
}

const Logic = ({ data }: { data: ILogic }) => {
  const { title, authorId, size, timeLimit } = data;

  return (
    <button
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
      <h1>{title}</h1>

      <div>
        <h5>author: {authorId}</h5>

        <h5>size: {size}</h5>
        <h5>time: {timeLimit}</h5>
      </div>
    </button>
  );
};

export default Logic;
