// 힌트가 힌트 영역에 알맞게 표시된다.

import { render, screen, within } from '@testing-library/react';
import LogicPaper from '..';
import getHints from '../getHints';
import cases from 'jest-in-case';
import userEvent from '@testing-library/user-event';
import HintCell from './HintCell';

const testCases = {
  empty: {
    solution: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  },
  filled: {
    solution: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  },
  sparse: {
    solution: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  },
  car: {
    solution: [
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
    ],
  },
};

describe('힌트가 힌트 영역에 알맞게 표시된다.', () => {
  cases(
    '여러가지 케이스',
    ({ solution }) => {
      const hints = getHints(solution);
      window.alert = jest.fn()
      render(<LogicPaper rowLength={solution.length} colLength={solution[0].length} solution={solution} />);

      // row hints
      const logicPaperRowHints = screen.getAllByRole('row-hint').map((rowHint: HTMLElement) =>
        within(rowHint)
          .queryAllByText(/(\d+)/)
          .map((hint: HTMLElement) => +(hint.textContent || hint.innerText)),
      );

      expect(logicPaperRowHints).toEqual(hints.row);

      // col hints
      const logicPaperColumnHints = screen.getAllByRole('column-hint').map((columnHint: HTMLElement) =>
        within(columnHint)
          .queryAllByText(/\d+/)
          .map((hint: HTMLElement) => +(hint.textContent || hint.innerText)),
      );

      expect(logicPaperColumnHints).toEqual(hints.column);
    },
    testCases,
  );
});
