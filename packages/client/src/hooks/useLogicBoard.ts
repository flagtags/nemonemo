import LogicBoardStore, {
  logicBoardStoreSnapshot,
} from '@/store/logicBoardStore';
import { CELL_STATE } from '@/types/logic';
import _ from 'lodash';
import { useEffect, useReducer, useSyncExternalStore } from 'react';

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

const logicBoardStore = new LogicBoardStore();

const useLogicBoard = ({
  rowLength,
  colLength,
}: {
  rowLength: number;
  colLength: number;
}): [logicBoardStoreSnapshot, LogicBoardStore] => {
  const snapshot = useSyncExternalStore(
    (onStoreChange) => {
      logicBoardStore.addListener(onStoreChange);
      return () => logicBoardStore.removeListener(onStoreChange);
    },
    () => logicBoardStore.getSnapshot(),
  );

  useEffect(() => {
    logicBoardStore.initialize(rowLength);
  }, [rowLength]);

  return [snapshot, logicBoardStore];
};

export default useLogicBoard;
