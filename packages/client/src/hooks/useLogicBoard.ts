import { CELL_STATE } from '@/types/logic';
import _ from 'lodash';
import { useEffect, useReducer } from 'react';
export interface IChangeCellStateAction {
  init: boolean;
  rowLength: number;
  colLength: number;
  rowIndex?: number;
  colIndex?: number;
  toBe?: CELL_STATE;
}

export interface IChangeCellState {
  rowIndex?: number;
  colIndex?: number;
  toBe?: CELL_STATE;
}

const useLogicBoard = ({
  rowLength,
  colLength,
}: {
  rowLength: number;
  colLength: number;
}) => {
  const cellStateReducer = (
    state: CELL_STATE[][],
    action: IChangeCellStateAction,
  ): CELL_STATE[][] => {
    const tempCellStates = _.cloneDeep(state);

    if (action.init === true) {
      return Array(action.rowLength)
        .fill(0)
        .map(() => Array(action.colLength).fill(CELL_STATE.BLANK));
    }

    if (action.rowIndex === undefined || action.colIndex === undefined)
      return tempCellStates;

    switch (action.toBe) {
      case CELL_STATE.FILL:
        tempCellStates[action.rowIndex][action.colIndex] = CELL_STATE.FILL;
        return tempCellStates;
      case CELL_STATE.BLANK:
        tempCellStates[action.rowIndex][action.colIndex] = CELL_STATE.BLANK;
        return tempCellStates;
      case CELL_STATE.NOTHING:
        tempCellStates[action.rowIndex][action.colIndex] = CELL_STATE.NOTHING;
        return tempCellStates;
      default:
        return state;
    }
  };

  const [cellStates, changeCellState] = useReducer(
    cellStateReducer,
    Array(rowLength)
      .fill(0)
      .map(() => Array(colLength).fill(CELL_STATE.BLANK)),
  );

  useEffect(() => {
    changeCellState({ init: true, rowLength, colLength });
  }, [rowLength, colLength]);

  return {
    cellStates,
    changeCellState: changeCellState as React.Dispatch<IChangeCellState>,
  };
};

export default useLogicBoard;
