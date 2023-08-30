export interface ILogic {
  _id: string;
  answer: boolean[][];
  hintRow: number[][];
  hintColumn: number[][];
  timeLimit: number;
  title: string;
  authorId: string;
  size: number;
}

export enum CELL_STATE {
  BLANK = 0,
  FILL = 1,
  NOTHING = 2,
}

export enum CELL_SOLUTION_STATE {
  BLANK = CELL_STATE.BLANK,
  FILL = CELL_STATE.FILL,
}

export type IBoard = CELL_STATE[][];

export type ILogicSolution = CELL_SOLUTION_STATE[][];

export interface IHint {
  row: number[][];
  column: number[][];
}

export type IFlexDirection = 'column' | 'row';
