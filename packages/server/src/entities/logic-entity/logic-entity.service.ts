import { LogicEntityDto } from '@dto/logic/logic-entity.dto';
import _ from 'lodash';

export class LogicEntity {
  readonly answer: boolean[][];
  readonly hintRow: number[][];
  readonly hintColumn: number[][];
  readonly timeLimit: number;
  readonly title: string;
  readonly authorId: string;
  readonly size: number;

  constructor(logicEntityDto: LogicEntityDto) {
    this.answer = logicEntityDto.answer;
    this.timeLimit = logicEntityDto.timeLimit;
    this.title = logicEntityDto.title;
    this.authorId = logicEntityDto.authorId;
    this.hintRow = this.getHints(logicEntityDto.answer).row;
    this.hintColumn = this.getHints(logicEntityDto.answer).column;
    this.size = logicEntityDto.answer.length;
  }

  private splitSum(array: boolean[]): number[] {
    return array
      .map((cellState) => (cellState ? '1' : '0'))
      .join('')
      .split('0')
      .reduce<number[]>((acc, cellState: string) => {
        if (!cellState) return acc;
        return [...acc, cellState.length];
      }, []);
  }

  private getHints(answer: boolean[][]): {
    row: number[][];
    column: number[][];
  } {
    const rowsOfLogic = answer;
    const columnsOfLogic = _.zip(...answer);

    const rowHints = rowsOfLogic.map((row) => this.splitSum(row));
    const columnHints = columnsOfLogic.map((column) => this.splitSum(column));

    return {
      row: rowHints,
      column: columnHints,
    };
  }
}
