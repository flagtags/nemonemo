import styled from 'styled-components';
import getLogic from '../../api/getLogic';
import Header from '../../components/Header';
import LogicPaper from '../../components/LogicPaper';
import Fetcher from '../../api/fetcher';
import { useParams } from 'react-router-dom';
import { IBoard } from '@/types/logic';
import { useQuery } from 'react-query';
import options from '@/config/reactQuery/options';
import { useMemo } from 'react';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const convertSolution = (solution: boolean[][]) =>
  solution.map((row) => row.map((col) => (col ? 1 : 0)));

function Game() {
  const { logicId } = useParams();

  const { data: logic } = useQuery(
    ['logic', logicId],
    ({ queryKey }) => new Fetcher(`/logic/${queryKey[1]}`).get<IBoard>(),
    options,
  );

  if (!logic) throw new Error('logic empty');

  const { title, answer, size } = logic;
  const numberSolution = useMemo(() => convertSolution(answer), [answer]);

  return (
    <Container className="nemonemologic">
      <Header title={title} />
      <LogicPaper
        rowLength={size}
        colLength={size}
        solution={numberSolution}
      />
    </Container>
  );
}

export default Game;
