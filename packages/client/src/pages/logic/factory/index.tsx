import Fetcher from '@/api/fetcher';
import LogicForm from '@/components/LogicForm';
import useLogicBoard from '@/hooks/useLogicBoard';
import { useState } from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  font-size: 25px;
  margin: 10px;
`;

const Input = styled.input`
  font-size: 25px;
  margin-right: 10px;
  margin-left: 10px;
  border: none;
  border-bottom: 1px solid;
`;

const Button = styled.button`
  border: 1px solid;
  padding: 7px;
  font-size: 15px;
  margin: 10px;
  background-color: ${(props) => props.color};
  border-radius: 4px;
  color: white;
`;

export const DEFAULT_SIZE = 5;

const LogicFactory = () => {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [sizeInputValue, setSizeInputValue] = useState(DEFAULT_SIZE);
  const [title, setTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState(5 * 60);

  const { cellStates, changeCellState } = useLogicBoard({
    rowLength: size,
    colLength: size,
  });

  const onSubmitPress = () => {
    new Fetcher('/logic').post({
      title: title,
      answer: cellStates,
      timeLimit,
      size,
    });
  };

  return (
    <>
      <h1>네모네모 로직을 직접 만들어봐요!</h1>
      <Label>
        제목 :
        <Input
          type="text"
          value={title}
          onFocus={(e) => e.target.select()}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Label>
      <Label>
        제한시간 :
        <Input
          type="number"
          value={timeLimit ? timeLimit : ''}
          onFocus={(e) => {
            setTimeLimit(0);
          }}
          onChange={(e) => {
            setTimeLimit(+e.target.value);
          }}
        />
      </Label>

      <Label>
        사이즈 :
        <Input
          type="number"
          onFocus={(e) => e.target.select()}
          onChange={(e) => setSizeInputValue(+e.target.value)}
        />
        <Button
          onClick={() => setSize(sizeInputValue)}
          role="apply-size"
          color="lightblue"
        >
          적용
        </Button>
      </Label>

      <LogicForm
        size={size}
        cellStates={cellStates}
        changeCellState={changeCellState}
      />

      <Button
        role="submit"
        color="pink"
        onClick={onSubmitPress}
      >
        완성
      </Button>
    </>
  );
};

export default LogicFactory;
