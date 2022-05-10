// test-utils.js
import { queryHelpers } from '@testing-library/dom';
import { screen as defaultScreen } from '@testing-library/react';

const queryAllByTestColumnId = queryHelpers.queryAllByAttribute.bind(null, 'data-test-column-id');

const queryAllByTestRowId = queryHelpers.queryAllByAttribute.bind(null, 'data-test-row-id');

const queryAllByCoordinateId = (container: HTMLElement, row: number, column: number) => {
  const columnCells = queryAllByTestColumnId(container, column);

  const res = columnCells.filter((columnCell: HTMLElement) => {
    if (columnCell.dataset.testRowId === undefined) return false;
    return +columnCell.dataset.testRowId === row;
  });

  return res;
};

export * from '@testing-library/react';

export const screen = {
  ...defaultScreen,
  queryAllByTestColumnId,
  queryAllByTestRowId,
  queryAllByCoordinateId(row: number, column: number) {
    return queryAllByCoordinateId(document.body, row, column);
  },
};

export { queryAllByTestColumnId, queryAllByTestRowId, queryAllByCoordinateId };
