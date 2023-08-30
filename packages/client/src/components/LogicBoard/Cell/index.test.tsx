import { CELL_STATE } from '@/types/logic';
import { render, screen } from '@testing-library/react';
import {
  testFillState,
  testBlankstate,
  testNothingState,
} from '../../LogicPaper/testUtil';
import userEvent from '@testing-library/user-event';
import Cell from './index';

describe('Cell 컴포넌트가 state 따라 보여지는가.', () => {
  test('fill', () => {
    const { container } = render(
      <Cell
        state={CELL_STATE.FILL}
        onClick={() => {}}
        onContextMenu={() => {}}
        rowIndex={0}
        columnIndex={0}
      />,
    );

    testFillState(container);
  });

  test('blank', () => {
    const { container } = render(
      <Cell
        state={CELL_STATE.BLANK}
        onClick={() => {}}
        onContextMenu={() => {}}
        rowIndex={0}
        columnIndex={0}
      />,
    );

    testBlankstate(container);
  });

  test('nothing', () => {
    const { container } = render(
      <Cell
        state={CELL_STATE.NOTHING}
        onClick={() => {}}
        onContextMenu={() => {}}
        rowIndex={0}
        columnIndex={0}
      />,
    );

    testNothingState(container);
  });
});

describe('Cell 컴포넌트 이벤트 핸들러 ', () => {
  test('우클릭', async () => {
    const onContextMenu = jest.fn();

    render(
      <Cell
        state={CELL_STATE.FILL}
        onContextMenu={onContextMenu}
        onClick={() => {}}
        rowIndex={0}
        columnIndex={0}
      />,
    );

    const button = screen.getByRole('cell_button');
    const user = userEvent.setup();
    await user.pointer({ keys: '[MouseRight]', target: button });

    expect(onContextMenu).toHaveBeenCalledTimes(1);
  });

  test('좌클릭', async () => {
    const onClick = jest.fn();

    render(
      <Cell
        state={CELL_STATE.FILL}
        onContextMenu={() => {}}
        onClick={onClick}
        rowIndex={0}
        columnIndex={0}
      />,
    );

    const button = screen.getByRole('cell_button');
    const user = userEvent.setup();

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
