import styled from 'styled-components';
import getLogic from '../../api/getLogic';
import Header from '../../components/Header';
import LogicPaper from '../../components/LogicPaper';
import Fetcher from '../../api/fetcher';
import { useParams } from 'react-router-dom';
import { ILogic } from '@/types/logic';
import { useQuery } from 'react-query';
import options from '@/config/reactQuery/options';
import { useMemo } from 'react';
import { time } from 'console';
import Timer from './Timer';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
`;

const convertSolution = (solution: boolean[][]) =>
  solution.map((row) => row.map((col) => (col ? 1 : 0)));

function Game() {
  const { logicId } = useParams();
  if (!logicId) throw new Error('logic id is not defined');

  const { data: logic } = useQuery(
    ['logic', logicId],
    ({ queryKey }) => new Fetcher(`/logic/${queryKey[1]}`).get<ILogic>(),
    options,
  );

  if (!logic) throw new Error('logic empty');

  const { title, answer, size, timeLimit, authorId } = logic;

  console.log(authorId);

  const numberSolution = useMemo(() => convertSolution(answer), [answer]);

  return (
    <Container className="nemonemologic">
      <Header title={title} />
      <h6> author: {authorId} </h6>

      <Timer timeLimit={timeLimit} />

      <LogicPaper
        rowLength={size}
        colLength={size}
        solution={numberSolution}
      />
    </Container>
  );
}

export default Game;

// alert만 띄운다 -> 계속하기(timer 멈춤) OR 다시하기(paper 비우기, timer 처음 부터)
