import { CELL_SOLUTION_STATE, CELL_STATE, IHint, ILogic, ILogicSolution } from './type';
import _ from 'lodash'

export function splitSum(array: CELL_SOLUTION_STATE[]):number[] {
  return array.join('').split(CELL_STATE.BLANK.toString()).reduce<number[]>((acc, cellState:string) => {
    if (!cellState) return acc;
    return [...acc,cellState.length];
  }, []);
}

export default function getHints(logic:ILogicSolution): IHint {
  const rowsOfLogic = logic;
  const columnsOfLogic = _.zip(...logic) as ILogicSolution;

  const rowHints = rowsOfLogic.map((row: CELL_SOLUTION_STATE[]) => splitSum(row))
  const columnHints = columnsOfLogic.map((column: CELL_SOLUTION_STATE[]) => splitSum(column))

  return {
    row: rowHints,
    column: columnHints
  }
}
