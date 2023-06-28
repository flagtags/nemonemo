import React, { useEffect, useReducer } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { CELL_STATE } from './type';
import HintCell from './Hints/HintCell';
import getHints from './getHints';
import LogicBoard from '@/components//LogicBoard';
import useLogicBoard from '@/hooks/useLogicBoard';

const Td = styled.td`
  height: 30px;
  width: 30px;
  border: 2px solid black;
  text-align: center;
  vertical-align: middle;
`;

export default function LogicForm({
  rowLength,
  colLength,
  solution,
}: {
  rowLength: number;
  colLength: number;
  solution: number[][];
}) {
  const [cellStates, changeCellState] = useLogicBoard({ rowLength, colLength });

  const hints = getHints(solution);

  return (
    <LogicBoard
      cellStates={cellStates}
      changeCellState={changeCellState}
      hints={hints}
      rowLength={rowLength}
      colLength={colLength}
    />
  );
}
