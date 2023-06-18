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
    console.log('before each');
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

  afterEach(() => {
    console.log('mock clear');
    jest.restoreAllMocks();
  });

  describe('List not rendering', () => {
    console.log('List not rendering describe');
    test('비로그인 시 리다이렉트', async () => {
      console.log('비로그인 시 리다이렉트 test');
      // 비로그인을 목록 api 요청했을 때 401 에러 나오면 비로그인으로 생각함
      const tempFetcherGet = Fetcher.prototype.get;
      const spyOnFn = jest
        .spyOn(Fetcher.prototype, 'get')
        .mockImplementationOnce(async () => {
          throw new AxiosError(
            'Requset failed with status code 401',
            'ERR_BAD_REQUEST',
            undefined,
            undefined,
            {
              status: 401,
            } as AxiosResponse,
          );
        });

      jest
        .spyOn(IntersectionObserver.prototype, 'takeRecords')
        .mockReturnValueOnce([
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
        expect(router.state.location.pathname).toBe('/account');
      });

      Fetcher.prototype.get = tempFetcherGet;
      console.log('after 비로그인', Fetcher.prototype.get);
    });
  });

  describe('목록 렌더링 테스트', () => {
    beforeEach(() => {
      console.log('목록 렌더링 테스트의 before each');
    });

    test('페이지 헤더', async () => {
      console.log('페이지 헤더 테스트');

      console.log(Fetcher.prototype.get);

      const res = Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (id) => {
        return {
          _id: id,
          title: `title${id}`,
          authorId: 1,
          size: 1,
          timeLimit: 1,
        };
      });

      jest.spyOn(Fetcher.prototype, 'get').mockResolvedValue(res);

      // console.log(Fetcher.prototype.get());

      render(
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<Redirect path="/account" />}>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </QueryClientProvider>,
      );

      await waitFor(() => expect(Fetcher.prototype.get).toBeCalledTimes(1));
      await waitFor(() =>
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
          '로직 목록',
        ),
      );
    });

    test.skip('초기 목록 렌더링', async () => {
      console.log('초기 목록 렌더링');
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

    test.skip('스크롤 후 next page 목록 렌더링', async () => {
      console.log('스크롤 후 next page 목록 렌더링 test');
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
  });
});
