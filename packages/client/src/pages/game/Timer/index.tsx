import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Popup from '@/components/Popup';

interface IProps {
  isCounting: boolean;
  remainTime: number;
  startTimer: () => void;
}

const Container = styled.div`
  width: 300px;
`;

const Timer = ({ remainTime, startTimer, isCounting }: IProps) => {
  return (
    <Container>
      <button
        onClick={startTimer}
        disabled={!!isCounting}
      >
        시작
      </button>

      <div role={'remainTimeView'}>{remainTime} 초</div>
    </Container>
  );
};

export default Timer;
