import styled from 'styled-components';
import { useState, useEffect } from 'react';

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

        window.alert('시간 초과');
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
    </Container>
  );
};

export default Timer;
