import { getByRole, render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Timer from '.';
// 최초에 timeLimit 값이 있고 시작 버튼을 누르면 매 초 시간이 줄어든다
// 0초가 되면 alert가 뜨고
// 다시하기 -> timer 초기화, game 초기화
// 계속하기 -> timer 0초로 남고, game판 유지
const user = userEvent.setup({ delay: null });

describe('타이머', () => {
  let timeLimitMs: number;
  const initGame = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers();
    timeLimitMs = 10000;

    render(
      <Timer
        timeLimit={timeLimitMs}
        initGame={initGame}
      />,
    );
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

  test('타이머 테스트', async () => {
    const startButton = screen.getByRole('button', { name: '시작' });

    await user.click(startButton);

    jest.advanceTimersByTime(1000);

    const remainTimeView = screen.getByRole('remainTimeView');
    expect(remainTimeView).toHaveTextContent('9 초');
  });

  describe('시간초과', () => {
    beforeEach(async () => {
      const startButton = screen.getByRole('button', { name: '시작' });

      await user.click(startButton);

      jest.advanceTimersByTime(timeLimitMs);
    });

    test('alert 창 노출', () => {
      // 시간 초과 시 alert가 뜨는지
      const endPopup = screen.getByText('시간 종료!');
      expect(endPopup).toBeInTheDocument();
    });
    test('계속하기', async () => {
      //기존의 게임판 유지
      const restartButton = screen.getByRole('button', { name: '계속하기' });

      await user.click(restartButton);

      const remainTimeView = screen.getByRole('remainTimeView');
      expect(remainTimeView).toHaveTextContent('0 초');
    });
    test('다시하기', async () => {
      const continueButton = screen.getByRole('button', { name: '다시하기' });
      await user.click(continueButton);

      const remainTimeView = screen.getByRole('remainTimeView');
      expect(remainTimeView).toHaveTextContent('10 초');
      // 게임판 초기화
      expect(initGame).toBeCalled();
    });
  });
});
