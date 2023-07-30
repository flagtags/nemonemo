import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Popup from '@/components/Popup';

interface IProps {
  timeLimit: number;
}

const Container = styled.div`
  width: 300px;
`;

const formatTime = (time: number) => {
  return Math.round(time / 1000);
};

const Timer = ({ timeLimit }: IProps) => {
  const [startTime, setStartTime] = useState<number>();
  const [timeOnView, setTimeOnView] = useState<number>(formatTime(timeLimit));
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const onStart = () => {
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
        setTimeOnView(formatTime(timeLimit));

        setIsPopupOpen(true);
        return;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  return (
    <Container>
      <button
        onClick={onStart}
        disabled={!!startTime}
      >
        시작
      </button>

      <div role={'remainTimeView'}>{timeOnView} 초</div>

      <Popup
        isOpen={isPopupOpen}
        close={() => {
          setIsPopupOpen(false);
        }}
      >
        <div>팝업</div>
      </Popup>
    </Container>
  );
};

export default Timer;
