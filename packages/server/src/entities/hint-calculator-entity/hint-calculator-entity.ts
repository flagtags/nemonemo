import zip from 'lodash/zip';

export class HintCalculatorEntity {
  static splitSum(array: boolean[]): number[] {
    return array
      .map((cellState) => (cellState ? '1' : '0'))
      .join('')
      .split('0')
      .reduce<number[]>((acc, cellState: string) => {
        if (!cellState) return acc;
        return [...acc, cellState.length];
      }, []);
  }

  static getHints(answer: boolean[][]): {
    row: number[][];
    column: number[][];
  } {
    const rowsOfLogic = answer;
    const columnsOfLogic = zip(...answer);

    const rowHints = rowsOfLogic.map((row) => this.splitSum(row));
    const columnHints = columnsOfLogic.map((column) => this.splitSum(column));

    return {
      row: rowHints,
      column: columnHints,
    };
  }
}
