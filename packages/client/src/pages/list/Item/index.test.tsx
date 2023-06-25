import { render, screen, waitFor } from '@testing-library/react';
import Logic from './index';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

describe('list item', () => {
  test('list item click', async () => {
    const mockedLogicData = {
      _id: 'asdf',
      title: 'title',
      authorId: 'j03y14',
      size: 10,
      timeLimit: 10000,
      answer: [
        [false, true, false],
        [false, true, false],
        [false, true, false],
      ],
      hintRow: [[1], [1], [1]],
      hintColumn: [[0], [3], [0]],
    };

    const router = createMemoryRouter(
      [
        { path: '/game/:logicId', element: null },
        { path: '/list', element: <Logic data={mockedLogicData} /> },
      ],
      {
        initialEntries: ['/list'],
      },
    );

    render(<RouterProvider router={router} />);
    const listItem = screen.getByRole('logicListItem');
    userEvent.click(listItem);

    await waitFor(() =>
      expect(router.state.location.pathname).toBe('/game/asdf'),
    );
  });
});
