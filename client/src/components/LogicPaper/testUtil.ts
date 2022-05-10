export const testFillState = (container: HTMLElement) => {
  expect(container.getElementsByClassName('blank').length).toBe(0);
  expect(container.getElementsByTagName('img')[0]).toHaveAttribute('alt', 'fill');
  expect(container.getElementsByTagName('img')[0]).not.toHaveAttribute('alt', 'nothing');
};

export const testBlankstate = (container: HTMLElement) => {
  expect(container.getElementsByClassName('blank').length).toBe(1);
  expect(container.getElementsByTagName('img').length).toBe(0);
  expect(container.getElementsByTagName('img').length).toBe(0);
};

export const testNothingState = (container: HTMLElement) => {
  expect(container.getElementsByClassName('blank').length).toBe(0);
  expect(container.getElementsByTagName('img')[0]).not.toHaveAttribute('alt', 'fill');
  expect(container.getElementsByTagName('img')[0]).toHaveAttribute('alt', 'nothing');
};
