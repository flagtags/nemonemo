import { render, screen } from '@testing-library/react';
import Timer from '.';

describe('타이머', () => {
  test('렌더링 테스트', () => {
    render(
      <Timer
        startTimer={jest.fn()}
        remainTime={10}
        isCounting={false}
      />,
    );

    const startButton = screen.getByRole('button', { name: '시작' });
    const remainTimeView = screen.getByRole('remainTimeView');

    expect(startButton).toBeInTheDocument();
    expect(remainTimeView).toBeInTheDocument();
  });
});
