import { CELL_STATE } from './type';

export type ICellStateAlt = 'fill' | 'blank' | 'nothing';

export const cellStateMap = {
  fill: CELL_STATE.FILL,
  blank: CELL_STATE.BLANK,
  nothing: CELL_STATE.NOTHING,
};

export const getStateFromAlt = (cells: HTMLElement[]) => (
  cells.map((cell) => {
    const cellImage = cell.getElementsByTagName('img')[0];
    if (!cellImage) return CELL_STATE.BLANK;

    const cellAlt = cellImage.getAttribute('alt');
    if (cellAlt === null) throw new Error('cell alt is missing');

    return cellStateMap[cellAlt as ICellStateAlt];
  })
);
