import userEvent from '@testing-library/user-event';
import { render, screen, queryAllByCoordinateId, waitFor } from '../../test-utils';
import { getStateFromAlt } from './util';
import { CELL_SOLUTION_STATE, CELL_STATE } from './type';
import LogicPaper from '.';
import { testBlankstate, testFillState, testNothingState } from './testUtil';
import getHints from './getHints';
import cases from 'jest-in-case';

describe('로직 페이퍼 렌더링', () => {
  test('솔루션 2차원 배열의 행, 열만큼 로직 페이퍼 렌더링.', () => {
    const solution = [
      [CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.FILL],
      [CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.FILL],
      [CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.FILL],
    ];

    const rowLength = solution.length;
    const colLength = solution[0].length;

    render(<LogicPaper rowLength={rowLength} colLength={colLength} solution={solution} />);

    expect(screen.getAllByRole('row')).toHaveLength(rowLength);
    expect(screen.getAllByRole('cell')).toHaveLength(rowLength * colLength);
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describe('로직 페이퍼 클릭 처리', () => {
  let firstCell: HTMLElement;
  let restCells: HTMLElement[];
  let cellStates: CELL_STATE[];

  beforeEach(() => {
    const solution = [
      [CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.FILL],
      [CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.FILL],
      [CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.FILL],
    ];
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<LogicPaper rowLength={3} colLength={3} solution={solution} />);
    [firstCell, ...restCells] = screen.getAllByRole('cell_button');
    cellStates = getStateFromAlt(restCells);
  });

  afterEach(() => {
    // 나머지 셀에 변화 없음 확인
    const [_, ...restCells] = screen.getAllByRole('cell_button');
    expect(getStateFromAlt(restCells)).toEqual(cellStates);
  });

  describe('fill 일 때', () => {
    beforeEach(() => {
      userEvent.click(firstCell);
      testFillState(firstCell);
    });

    test('좌클릭 처리', () => {
      userEvent.click(firstCell);
      testBlankstate(firstCell);
    });

    test('우클릭 처리', () => {
      userEvent.click(firstCell, { button: 2 });
      testNothingState(firstCell);
    });
  });

  describe('blank 일 때', () => {
    beforeEach(() => {
      testBlankstate(firstCell);
    });

    test('좌클릭 처리', () => {
      userEvent.click(firstCell);
      testFillState(firstCell);
    });

    test('우클릭 처리', () => {
      userEvent.click(firstCell, { button: 2 });
      testNothingState(firstCell);
    });
  });

  describe('nothing 일 때', () => {
    beforeEach(() => {
      userEvent.click(firstCell, { button: 2 });
      testNothingState(firstCell);
    });

    test('좌클릭 처리', () => {
      userEvent.click(firstCell);
      testFillState(firstCell);
    });

    test('우클릭 처리', () => {
      userEvent.click(firstCell, { button: 2 });
      testBlankstate(firstCell);
    });
  });
});

describe('힌트 숫자를 클릭하면 삭선처리', () => {
  let firstHintNumber: HTMLElement;
  let restHintNumbers: HTMLElement[];

  beforeEach(() => {
    const solution = [
      [CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.BLANK, CELL_SOLUTION_STATE.FILL],
      [CELL_SOLUTION_STATE.BLANK, CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.BLANK],
      [CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.BLANK, CELL_SOLUTION_STATE.FILL],
    ];

    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<LogicPaper rowLength={3} colLength={3} solution={solution} />);

    [firstHintNumber, ...restHintNumbers] = screen.getAllByRole('hint_button');

    expect(firstHintNumber).not.toHaveStyle({ 'text-decoration': 'line-through', color: 'blue' });
    restHintNumbers.forEach((restHintNumber) => {
      expect(restHintNumber).not.toHaveStyle({ 'text-decoration': 'line-through', color: 'blue' });
    });
  });

  test('클릭 처리', () => {
    userEvent.click(firstHintNumber);
    expect(firstHintNumber).toHaveStyle({ 'text-decoration': 'line-through', color: 'blue' });
    restHintNumbers.forEach((restHintNumber) => {
      expect(restHintNumber).not.toHaveStyle({ 'text-decoration': 'line-through', color: 'blue' });
    });
  });

  test('클릭 두 번 처리', () => {
    userEvent.click(firstHintNumber);
    userEvent.click(firstHintNumber);
    expect(firstHintNumber).not.toHaveStyle({ 'text-decoration': 'line-through', color: 'blue' });
    restHintNumbers.forEach((restHintNumber) => {
      expect(restHintNumber).not.toHaveStyle({ 'text-decoration': 'line-through', color: 'blue' });
    });
  });
});

const testCases = {
  '천재(정답만 클릭)': {
    clicks: [
      { coordinate: [0, 0], buttonType: 'left' },
      { coordinate: [0, 2], buttonType: 'left' },
      { coordinate: [1, 1], buttonType: 'left' },
      { coordinate: [2, 0], buttonType: 'left' },
      { coordinate: [2, 2], buttonType: 'left' },
      { coordinate: [0, 0], buttonType: 'left' },
      { coordinate: [0, 0], buttonType: 'left' },
    ],

    solution: [
      [CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.BLANK, CELL_SOLUTION_STATE.FILL],
      [CELL_SOLUTION_STATE.BLANK, CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.BLANK],
      [CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.BLANK, CELL_SOLUTION_STATE.FILL],
    ],
  },

  '수재(한 번 정답 아닌걸 좌클릭 후 마지막에 우클릭)': {
    clicks: [
      { coordinate: [0, 0], buttonType: 'left' },
      { coordinate: [0, 2], buttonType: 'left' },
      { coordinate: [0, 1], buttonType: 'left' },
      { coordinate: [1, 1], buttonType: 'left' },
      { coordinate: [2, 0], buttonType: 'left' },
      { coordinate: [2, 2], buttonType: 'left' },
      { coordinate: [0, 0], buttonType: 'left' },
      { coordinate: [0, 0], buttonType: 'left' },
      { coordinate: [0, 1], buttonType: 'right' },
    ],

    solution: [
      [CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.BLANK, CELL_SOLUTION_STATE.FILL],
      [CELL_SOLUTION_STATE.BLANK, CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.BLANK],
      [CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.BLANK, CELL_SOLUTION_STATE.FILL],
    ],
  },

  '수재(한 번 정답 아닌걸 좌클릭 후 마지막에 좌클릭)': {
    clicks: [
      { coordinate: [0, 0], buttonType: 'left' },
      { coordinate: [0, 2], buttonType: 'left' },
      { coordinate: [0, 1], buttonType: 'left' },
      { coordinate: [1, 1], buttonType: 'left' },
      { coordinate: [2, 0], buttonType: 'left' },
      { coordinate: [2, 2], buttonType: 'left' },
      { coordinate: [0, 0], buttonType: 'left' },
      { coordinate: [0, 0], buttonType: 'left' },
      { coordinate: [0, 1], buttonType: 'left' },
    ],

    solution: [
      [CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.BLANK, CELL_SOLUTION_STATE.FILL],
      [CELL_SOLUTION_STATE.BLANK, CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.BLANK],
      [CELL_SOLUTION_STATE.FILL, CELL_SOLUTION_STATE.BLANK, CELL_SOLUTION_STATE.FILL],
    ],
  },
};

describe('클릭 시 정답 반응 처리', () => {
  cases(
    '여러가지 케이스',
    async ({
      solution,
      clicks,
    }: {
      solution: CELL_SOLUTION_STATE[][];
      clicks: { coordinate: number[]; buttonType: string }[];
    }) => {
      window.alert = jest.fn()

      render(<LogicPaper rowLength={3} colLength={3} solution={solution} />);

      clicks.map(({ coordinate: [row, column], buttonType }) => {
        // row, column을 받아서 클릭 할 버튼들의 좌표를 받아옴
        const clickedButton = screen.queryAllByCoordinateId(row, column)[0];
        // 각 좌표를 클릭함
        userEvent.click(clickedButton, { button: buttonType === 'left' ? 0 : 2 });
      });

      expect(window.alert).toBeCalledWith('정답입니다!');
    },
    testCases,
  );
});
