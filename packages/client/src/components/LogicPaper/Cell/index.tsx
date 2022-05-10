import styled from 'styled-components';
import { CELL_STATE } from '../type';
import React from 'react';

const Button = styled.button`
  display: block;
  border: none;
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 0;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const Blank = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Cell({
  state,
  onClick,
  onContextMenu,
  rowIndex,
  columnIndex,
}: {
  state: CELL_STATE;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  rowIndex: number;
  columnIndex: number;
}) {
  const FilledImage = <Image alt={'fill'} src={'/square.png'} />;
  const BlankImage = <Blank className={'blank'} />;
  const NothingImage = <Image alt={'nothing'} src={'/close.png'} />;

  const CellImage = {
    [CELL_STATE.FILL]: FilledImage,
    [CELL_STATE.BLANK]: BlankImage,
    [CELL_STATE.NOTHING]: NothingImage,
  };

  return (
    <Button
      data-test-row-id={rowIndex}
      data-test-column-id={columnIndex}
      role={'cell_button'}
      className={'cell_button'}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {CellImage[state]}
    </Button>
  );
}
