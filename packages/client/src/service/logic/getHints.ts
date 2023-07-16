import { CELL_SOLUTION_STATE, CELL_STATE, IHint, IBoard } from '@/types/logic';
import _ from 'lodash';

export function splitSum(array: CELL_STATE[]): number[] {
  return array
    .join('')
    .split(/0|2/)
    .reduce<number[]>((acc, cellState: string) => {
      if (!cellState) return acc;
      return [...acc, cellState.length];
    }, []);
}

export default function getHints(logic: IBoard): IHint {
  const rowsOfLogic = logic;
  const columnsOfLogic = _.zip(...logic) as IBoard;

  const rowHints = rowsOfLogic.map((row: CELL_STATE[]) => splitSum(row));
  const columnHints = columnsOfLogic.map((column: CELL_STATE[]) =>
    splitSum(column),
  );

  return {
    row: rowHints,
    column: columnHints,
  };
}
