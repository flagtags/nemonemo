import { getByRole, render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Timer from '.';
// 최초에 timeLimit 값이 있고 시작 버튼을 누르면 매 초 시간이 줄어든다
// 0초가 되면 alert가 뜨고
// 다시하기 -> timer 초기화, game 초기화
// 계속하기 -> timer 0초로 남고, game판 유지

describe('타이머', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    const timeLimitMs = 10000;

    render(<Timer timeLimit={timeLimitMs} />);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('렌더링 테스트', () => {
    const startButton = screen.getByRole('button', { name: '시작' });
    const remainTimeView = screen.getByRole('remainTimeView');

    expect(startButton).toBeInTheDocument();
    expect(remainTimeView).toHaveTextContent('10 초');
  });

  test('타이머 테스트', () => {
    const startButton = screen.getByRole('button', { name: '시작' });

    userEvent.click(startButton);

    jest.advanceTimersByTime(1000);

    const remainTimeView = screen.getByRole('remainTimeView');
    expect(remainTimeView).toHaveTextContent('9 초');
  });
