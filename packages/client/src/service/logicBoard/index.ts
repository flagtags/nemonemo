import { CELL_STATE, IBoard, IHint } from '@/types/logic';
import getHints from '../logic/getHints';

export default class LogicBoard {
  cellStates: CELL_STATE[][];

  constructor() {
    this.cellStates = [[]];
  }

  private makeInitialState(length: number) {
    return Array(length)
      .fill(0)
      .map(() => Array(length).fill(CELL_STATE.BLANK));
  }

  private changeCellState(
    state: CELL_STATE,
    rowIndex: number,
    colIndex: number,
  ) {
    if (this.cellStates === null) {
      throw new Error('initialize first');
    }
    this.cellStates[rowIndex][colIndex] = state;
  }

  onLeftClick(rowIndex: number, colIndex: number) {
    if (this.cellStates[rowIndex][colIndex] === CELL_STATE.FILL) {
      this.changeCellState(CELL_STATE.BLANK, rowIndex, colIndex);
    } else {
      this.changeCellState(CELL_STATE.FILL, rowIndex, colIndex);
    }
  }

  onRightClick(rowIndex: number, colIndex: number) {
    if (this.cellStates[rowIndex][colIndex] === CELL_STATE.NOTHING) {
      this.changeCellState(CELL_STATE.BLANK, rowIndex, colIndex);
    } else {
      this.changeCellState(CELL_STATE.NOTHING, rowIndex, colIndex);
    }
  }

  getHints(logic: IBoard) {
    return getHints(logic);
  }

  initialize(length: number) {
    this.cellStates = this.makeInitialState(length);
  }

  changeLength(length: number) {
    this.initialize(length);
  }
}
