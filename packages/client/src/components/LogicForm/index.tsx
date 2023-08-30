import React, { useEffect, useReducer } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import getHints from '@/service/logic/getHints';
import LogicBoard from '@/components//LogicBoard';
import useLogicBoard, {
  IChangeCellState,
  IChangeCellStateAction,
} from '@/hooks/useLogicBoard';
import { CELL_STATE } from '@/types/logic';

const Td = styled.td`
  height: 30px;
  width: 30px;
  border: 2px solid black;
  text-align: center;
  vertical-align: middle;
`;

export default function LogicForm({
  cellStates,
  onLeftClick,
  onRightClick,
}: {
  size: number;
  cellStates: CELL_STATE[][];
  onLeftClick: (rowIndex: number, colIndex: number) => void;
  onRightClick: (rowIndex: number, colIndex: number) => void;
}) {
  const hints = getHints(cellStates);

  return (
    <div role="logic-form">
      <LogicBoard
        cellStates={cellStates}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
        hints={hints}
      />
    </div>
  );
}
