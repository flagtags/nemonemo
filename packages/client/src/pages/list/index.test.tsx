import { render, screen, waitFor } from '@testing-library/react';
import { AxiosError, AxiosResponse } from 'axios';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import List from './index';
import Fetcher from '@/api/fetcher';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Redirect } from '@/components/Redirect';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'intersection-observer';
import { Suspense } from 'react';

describe('List', () => {
  let router: ReturnType<typeof createMemoryRouter>;
  let queryClient = new QueryClient();

  beforeEach(() => {
    router = createMemoryRouter(
      [
        { path: '/account', element: null },
        {
          path: '/list',
          element: (
            <ErrorBoundary fallback={<Redirect path="/account" />}>
              <Suspense fallback="로딩중..">
                <List />,
              </Suspense>
            </ErrorBoundary>
          ),
        },
      ],
      {
        initialEntries: ['/list'],
      },
    );
  });

  describe('목록 렌더링 테스트', () => {
    beforeEach(() => {
      jest.spyOn(Fetcher.prototype, 'get').mockResolvedValue(
        Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (id) => {
          return {
            _id: id,
            title: `title${id}`,
            authorId: 1,
            size: 1,
            timeLimit: 1,
          };
        }),
      );
    });

    test('페이지 헤더', async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<Redirect path="/account" />}>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </QueryClientProvider>,
      );

      await waitFor(() =>
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
          '로직 목록',
        ),
      );
    });

    test('초기 목록 렌더링', async () => {
      jest
        .spyOn(IntersectionObserver.prototype, 'takeRecords')
        .mockReturnValue([
          {
            isIntersecting: false,
          } as IntersectionObserverEntry,
        ]);

      render(
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<Redirect path="/account" />}>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </QueryClientProvider>,
      );

      await waitFor(() => {
        expect(screen.getAllByRole('logicListItem').length).toBe(10);
      });
    });

    test('스크롤 후 next page 목록 렌더링', async () => {
      jest.clearAllMocks();
      jest
        .spyOn(IntersectionObserver.prototype, 'takeRecords')
        .mockReturnValueOnce([
          {
            isIntersecting: true,
          } as IntersectionObserverEntry,
        ]);

      render(
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<Redirect path="/account" />}>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </QueryClientProvider>,
      );

      jest.spyOn(Fetcher.prototype, 'get').mockResolvedValue(
        Array.from([11, 12, 13, 14, 15, 16], (id) => {
          return {
            _id: id,
            title: `title${id}`,
            authorId: 1,
            size: 1,
            timeLimit: 1,
          };
        }),
      );

      jest
        .spyOn(IntersectionObserver.prototype, 'takeRecords')
        .mockReturnValueOnce([
          {
            isIntersecting: false,
          } as IntersectionObserverEntry,
        ]);

      await waitFor(() => {
        expect(screen.getAllByRole('logicListItem').length).toBe(16);
      });
    });

    test('비로그인 시 리다이렉트', async () => {
      jest.spyOn(Fetcher.prototype, 'get').mockRejectedValue(
        new AxiosError(
          'Requset failed with status code 401',
          'ERR_BAD_REQUEST',
          undefined,
          undefined,
          {
            status: 401,
          } as AxiosResponse,
        ),
      );

      render(
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<Redirect path="/account" />}>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </QueryClientProvider>,
      );

      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/account');
      });
    });
  });
});
