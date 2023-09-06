import { useEffect, useState } from 'react';

const roundSeconds = (time: number) => {
  return Math.round(time / 1000);
};

export default function useTimer(timeLimit: number, onTimerEnd: () => void) {
  const [startTime, setStartTime] = useState<number>();
  const [remainSeconds, setRemainSeconds] = useState(roundSeconds(timeLimit));

  const startTimer = () => {
    setStartTime(Date.now());
  };

  const stopTimer = () => {
    setStartTime(undefined);
  };

  const init = () => {
    setRemainSeconds(roundSeconds(timeLimit));
  };

  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      if (!startTime) return;
      const pastTime = Date.now() - startTime;

      const remainTime = timeLimit - pastTime;
      setRemainSeconds(roundSeconds(remainTime));

      if (remainTime <= 0) {
        setStartTime(undefined);
        onTimerEnd();
        return;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  return {
    init,
    startTimer,
    stopTimer,
    remainSeconds,
    isCounting: !!startTime,
  };
}
