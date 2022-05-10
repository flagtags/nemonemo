export enum CELL_STATE {
  BLANK = 0,
  FILL = 1,
  NOTHING = -1,
}

export enum CELL_SOLUTION_STATE {
  BLANK = CELL_STATE.BLANK,
  FILL = CELL_STATE.FILL,
}

export type ILogic = CELL_STATE[][];

export type ILogicSolution = CELL_SOLUTION_STATE[][];

export interface IHint {
  row: number[][];
  column: number[][];
}

export type IFlexDirection = 'column' | 'row';
