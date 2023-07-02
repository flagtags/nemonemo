import React, { useEffect, useReducer } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import getHints from '@/service/logic/getHints';
import LogicBoard from '@/components//LogicBoard';
import useLogicBoard from '@/hooks/useLogicBoard';

const Td = styled.td`
  height: 30px;
  width: 30px;
  border: 2px solid black;
  text-align: center;
  vertical-align: middle;
`;

export default function LogicForm({ size }: { size: number }) {
  const { cellStates, changeCellState } = useLogicBoard({
    rowLength: size,
    colLength: size,
  });

  const hints = getHints(cellStates);

  return (
    <div role="logic-form">
      <LogicBoard
        cellStates={cellStates}
        changeCellState={changeCellState}
        hints={hints}
      />
    </div>
  );
}
