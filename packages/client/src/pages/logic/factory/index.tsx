import LogicForm from '@/components/LogicForm';
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

const LogicFactory = () => {
  const [size, setSize] = useState(5);

  return (
    <>
      <h1>네모네모 로직을 직접 만들어봐요!</h1>
      <Label>
        제목 :
        <Input type="text" />
      </Label>
      <Label>
        제한시간 :
        <Input type="number" />
      </Label>

      <Label>
        사이즈 :
        <Input
          type="number"
          onChange={(e) => setSize(+e.target.value)}
        />
        <Button
          role="apply-size"
          color="lightblue"
        >
          적용
        </Button>
      </Label>

      <LogicForm size={size} />

      <Button
        role="submit"
        color="pink"
      >
        완성
      </Button>
    </>
  );
};

export default LogicFactory;
