import React, { useEffect, useReducer } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { CELL_STATE } from '@/types/logic';
import getHints from '@/service/logic/getHints';
import LogicBoard from '../LogicBoard';
import useLogicBoard from '@/hooks/useLogicBoard';

export default function LogicPaper({
  rowLength,
  colLength,
  solution,
}: {
  rowLength: number;
  colLength: number;
  solution: number[][];
}) {
  const [logicBoard, logicBoardStore] = useLogicBoard({
    rowLength,
    colLength,
  });

  const hints = logicBoardStore.getHints(solution);

  useEffect(() => {
    const checkAnswer = (answer: CELL_STATE[][]) => {
      return answer.every((row: CELL_STATE[], rowIndex: number) => {
        return row.every((answerCell: CELL_STATE, columnIndex: number) => {
          if (solution[rowIndex][columnIndex] === CELL_STATE.FILL) {
            if (answerCell !== CELL_STATE.FILL) return false;
          } else {
            if (answerCell === CELL_STATE.FILL) return false;
          }
          return true;
        });
      });
    };

    if (checkAnswer(logicBoard.cellStates as CELL_STATE[][])) {
      window.alert('정답입니다!');
    }
  }, [logicBoard, solution]);

  return (
    <div role="logic-paper">
      <LogicBoard
        cellStates={logicBoard.cellStates}
        onLeftClick={logicBoardStore.onLeftClick}
        onRightClick={logicBoardStore.onRightClick}
        hints={hints}
      />
    </div>
  );
}
