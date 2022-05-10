import React, { useEffect, useReducer } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Cell from './Cell';
import { CELL_STATE } from './type';
import HintCell from './Hints/HintCell';
import getHints from './getHints';

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
  const cellStateReducer = (state: CELL_STATE[][], action: any): any => {
    const tempCellStates = _.cloneDeep(state);

    switch (action.toBe) {
      case 'fill':
        tempCellStates[action.rowIndex][action.colIndex] = CELL_STATE.FILL;
        return tempCellStates;
      case 'blank':
        tempCellStates[action.rowIndex][action.colIndex] = CELL_STATE.BLANK;
        return tempCellStates;
      case 'nothing':
        tempCellStates[action.rowIndex][action.colIndex] = CELL_STATE.NOTHING;
        return tempCellStates;
    }
  };

  const [answerCellStates, dispatch] = useReducer(
    cellStateReducer,
    Array(rowLength)
      .fill(0)
      .map(() => Array(colLength).fill(CELL_STATE.BLANK)),
  );

  const onClick = (rowIndex: number, colIndex: number) => {
    if (answerCellStates[rowIndex][colIndex] === CELL_STATE.FILL) {
      dispatch({ toBe: 'blank', rowIndex, colIndex });
    } else {
      dispatch({ toBe: 'fill', rowIndex, colIndex });
    }
  };

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

    if (checkAnswer(answerCellStates)) {
      window.alert('정답입니다!');
    }
  }, [answerCellStates, solution]);

  const onContextMenu = (e: React.MouseEvent, rowIndex: number, colIndex: number) => {
    e.preventDefault();

    if (answerCellStates[rowIndex][colIndex] === CELL_STATE.NOTHING) {
      dispatch({ toBe: 'blank', rowIndex, colIndex });
    } else {
      dispatch({ toBe: 'nothing', rowIndex, colIndex });
    }
  };

  return (
    <table>
      <tbody>
      <tr role={'column-hint-row'}>
        <th />
        {hints.column.map((colHints: number[], columnIndex) => (
          <HintCell key={columnIndex} direction='column' role='column-hint' hints={colHints} />
        ))}
      </tr>
      {Array(rowLength)
        .fill(0)
        .map((_, rowIndex) => (
          <tr key={rowIndex}>
            <HintCell direction='row' role='row-hint' hints={hints.row[rowIndex]} />
            {Array(colLength)
              .fill(0)
              .map((_, columnIndex) => (
                <Td key={columnIndex}>
                  <Cell
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    state={answerCellStates[rowIndex][columnIndex]}
                    onClick={() => onClick(rowIndex, columnIndex)}
                    onContextMenu={(e: React.MouseEvent) => onContextMenu(e, rowIndex, columnIndex)}
                  />
                </Td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}