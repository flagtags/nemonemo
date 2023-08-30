import ErrorBoundary from '@/components/ErrorBoundary';
import { Redirect } from '@/components/Redirect';
import { Suspense } from 'react';
import { getByRole, render, waitFor, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Game from '.';
import { QueryClient, QueryClientProvider } from 'react-query';
import Fetcher from '@/api/fetcher';

describe('Game page 테스트', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  test('잘못된 logicId가 있으면 리스트으로 리다이렉트', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/game/:logicId',
          element: (
            <ErrorBoundary fallback={<Redirect path="/list" />}>
              <Suspense fallback="loading 중...">
                <Game />
              </Suspense>
            </ErrorBoundary>
          ),
        },
        { path: '/list', element: null },
      ],
      {
        initialEntries: ['/game/없음'],
      },
    );

    jest.spyOn(Fetcher.prototype, 'get').mockRejectedValue(new Error('error'));

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await waitFor(() => expect(router.state.location.pathname).toBe('/list'));
  });

  test('렌더링 테스트', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/game/:logicId',
          element: (
            <ErrorBoundary fallback={<Redirect path="/list" />}>
              <Suspense fallback="loading 중...">
                <Game />
              </Suspense>
            </ErrorBoundary>
          ),
        },
        { path: '/list', element: null },
      ],
      {
        initialEntries: ['/game/없음'],
      },
    );

    jest.spyOn(Fetcher.prototype, 'get').mockResolvedValue({
      _id: '1111',
      title: `title`,
      authorId: 1,
      size: 3,
      timeLimit: 1,
      answer: [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ],
      hintRow: [[1, 1], [1], [1, 1]],
      hintColumn: [[1, 1], [1], [1, 1]],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await waitFor(() =>
      expect(screen.getByRole('logic-paper')).toBeInTheDocument(),
    );
  });
});
