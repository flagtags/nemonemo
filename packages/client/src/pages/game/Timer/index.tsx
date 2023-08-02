import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Popup from '@/components/Popup';

interface IProps {
  timeLimit: number;
  initGame: () => void;
}

const Container = styled.div`
  width: 300px;
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

const formatTime = (time: number) => {
  return Math.round(time / 1000);
};

const Timer = ({ timeLimit, initGame }: IProps) => {
  const [startTime, setStartTime] = useState<number>();
  const [timeOnView, setTimeOnView] = useState<number>(formatTime(timeLimit));
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const startTimer = () => {
    setStartTime(Date.now());
  };

  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      if (!startTime) return;
      const timeDifference = Date.now() - startTime;

      const remainTime = timeLimit - timeDifference;
      setTimeOnView(formatTime(remainTime));

      if (remainTime <= 0) {
        setStartTime(undefined);
        setIsPopupOpen(true);
        return;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  const onContinue = () => {
    setIsPopupOpen(false);
  };

  const onRestart = () => {
    setTimeOnView(formatTime(timeLimit));
    startTimer();
    setIsPopupOpen(false);
    initGame();
  };

  return (
    <Container>
      <button
        onClick={startTimer}
        disabled={!!startTime}
      >
        시작
      </button>

      <div role={'remainTimeView'}>{timeOnView} 초</div>

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
    </Container>
  );
};

export default Timer;
