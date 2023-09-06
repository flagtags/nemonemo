import styled from 'styled-components';
import getLogic from '../../api/getLogic';
import Header from '../../components/Header';
import LogicPaper from '../../components/LogicPaper';
import Fetcher from '../../api/fetcher';
import { useParams } from 'react-router-dom';
import { ILogic } from '@/types/logic';
import { useQuery } from 'react-query';
import options from '@/config/reactQuery/options';
import { useMemo, useState } from 'react';
import { time } from 'console';
import Timer from './Timer';
import Popup from '@/components/Popup';
import useTimer from '@/hooks/useTimer';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
`;

const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;
const PopupButton = styled.button`
  border: 1px solid black;
  padding-top: 8px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 8px;
`;

const Spacer = styled.div`
  width: 16px;
  height: 16px;
`;

const convertSolution = (solution: boolean[][]) =>
  solution.map((row) => row.map((col) => (col ? 1 : 0)));

function Game() {
  const { logicId } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  if (!logicId) throw new Error('logic id is not defined');

  const { data: logic } = useQuery(
    ['logic', logicId],
    ({ queryKey }) => new Fetcher(`/logic/${queryKey[1]}`).get<ILogic>(),
    options,
  );

  if (!logic) throw new Error('logic empty');

  const { title, answer, size, timeLimit, authorId } = logic;

  const onTimerEnd = () => {
    setIsPopupOpen(true);
  };

  const { remainSeconds, startTimer, isCounting, init, stopTimer } = useTimer(
    timeLimit,
    onTimerEnd,
  );

  const onContinue = () => {
    setIsPopupOpen(false);
  };

  const onRestart = () => {
    init();
    startTimer();
    setIsPopupOpen(false);
  };

  const numberSolution = useMemo(() => convertSolution(answer), [answer]);

  return (
    <Container className="nemonemologic">
      <Header title={title} />
      <h6> author: {authorId} </h6>

      <Timer
        remainTime={remainSeconds}
        startTimer={startTimer}
        isCounting={isCounting}
      />

      <Popup
        isOpen={isPopupOpen}
        close={() => {}}
      >
        <PopupContainer>
          <h2>시간 종료!</h2>
          <PopupButton onClick={onContinue}>계속하기</PopupButton>
          <Spacer />
          <PopupButton onClick={onRestart}>다시하기</PopupButton>
        </PopupContainer>
      </Popup>

      <LogicPaper
        rowLength={size}
        colLength={size}
        solution={numberSolution}
        onEnd={stopTimer}
      />
    </Container>
  );
}

export default Game;
