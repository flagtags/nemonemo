import React, { useEffect, useReducer } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Cell from './Cell';
import { CELL_STATE, IHint } from '@/types/logic';
import HintCell from './Hints/HintCell';
import { IChangeCellState } from '@/hooks/useLogicBoard';

const Td = styled.td`
  height: 30px;
  width: 30px;
  border: 2px solid black;
  text-align: center;
  vertical-align: middle;
`;

interface ILogicBoardProps {
  hints: IHint;
  cellStates: CELL_STATE[][];
  onLeftClick: (rowIndex: number, colIndex: number) => void;
  onRightClick: (rowIndex: number, colIndex: number) => void;
}

export default function LogicBoard({
  hints,
  cellStates,
  onLeftClick,
  onRightClick,
}: ILogicBoardProps) {
  const onClick = (rowIndex: number, colIndex: number) => {
    onLeftClick(rowIndex, colIndex);
  };

  const onContextMenu = (
    e: React.MouseEvent,
    rowIndex: number,
    colIndex: number,
  ) => {
    e.preventDefault();
    onRightClick(rowIndex, colIndex);
  };

  return (
    <table role="logic-board">
      <tbody>
        <tr role={'column-hint-row'}>
          <th />
          {hints.column.map((colHints: number[], columnIndex) => {
            return (
              <HintCell
                key={columnIndex}
                direction="column"
                role="column-hint"
                hints={colHints}
              />
            );
          })}
        </tr>
        {Array(cellStates.length)
          .fill(0)
          .map((_, rowIndex) => (
            <tr key={rowIndex}>
              <HintCell
                direction="row"
                role="row-hint"
                hints={hints.row[rowIndex]}
              />
              {Array(cellStates[rowIndex].length)
                .fill(0)
                .map((_, columnIndex) => (
                  <Td key={columnIndex}>
                    <Cell
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      state={cellStates[rowIndex][columnIndex]}
                      onClick={() => onClick(rowIndex, columnIndex)}
                      onContextMenu={(e: React.MouseEvent) =>
                        onContextMenu(e, rowIndex, columnIndex)
                      }
                    />
                  </Td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
