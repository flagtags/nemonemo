import React from 'react';
import { screen, render } from '@testing-library/react';
import Header from './index';

test('헤더에 타이틀이 알맞게 렌더링 된다.', () => {
  const exampleString = '네모네모 자동차';
  render(<Header title={exampleString} />);

  expect(screen.getByText(exampleString)).not.toBe(null);
});
