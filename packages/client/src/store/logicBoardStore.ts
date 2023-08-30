import Store from './store';
import LogicBoard from '@/service/logicBoard';
import { CELL_STATE, IBoard, IHint } from '@/types/logic';

export type logicBoardStoreSnapshot = {
  cellStates: CELL_STATE[][];
};

export default class LogicBoardStore extends Store<logicBoardStoreSnapshot> {
  logicBoard = new LogicBoard();

  constructor() {
    super();
    this.takeSnapshot();

    this.onLeftClick = this.onLeftClick.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
  }

  getHints(logic: IBoard) {
    return this.logicBoard.getHints(logic);
  }

  initialize(length: number) {
    this.logicBoard.initialize(length);
    this.update();
  }

  changeLength(length: number) {
    this.logicBoard.changeLength(length);
    this.update();
  }

  onLeftClick(rowIndex: number, colIndex: number) {
    this.logicBoard.onLeftClick(rowIndex, colIndex);
    this.update();
  }

  onRightClick(rowIndex: number, colIndex: number) {
    this.logicBoard.onRightClick(rowIndex, colIndex);
    this.update();
  }

  private update() {
    this.takeSnapshot();
    this.publish();
  }

  private takeSnapshot() {
    this.snapshot = {
      cellStates: this.logicBoard.cellStates,
    };
  }
}
