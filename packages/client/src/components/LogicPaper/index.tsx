import React, { useEffect, useReducer } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { CELL_STATE } from '@/types/logic';
import getHints from '@/service/logic/getHints';
import LogicBoard from '../LogicBoard';
import useLogicBoard from '@/hooks/useLogicBoard';

const Td = styled.td`
  height: 30px;
  width: 30px;
  border: 2px solid black;
  text-align: center;
  vertical-align: middle;
`;

export default function LogicPaper({
  rowLength,
  colLength,
  solution,
}: {
  rowLength: number;
  colLength: number;
  solution: number[][];
}) {
  const { cellStates, changeCellState } = useLogicBoard({
    rowLength,
    colLength,
  });

  const hints = getHints(solution);

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

    if (checkAnswer(cellStates)) {
      window.alert('정답입니다!');
    }
  }, [cellStates, solution]);

  return (
    <div role="logic-paper">
      <LogicBoard
        cellStates={cellStates}
        changeCellState={changeCellState}
        hints={hints}
        rowLength={rowLength}
        colLength={colLength}
      />
    </div>
  );
}
