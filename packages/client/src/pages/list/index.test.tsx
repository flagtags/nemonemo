import { render, screen, waitFor } from '@testing-library/react';
import { AxiosError, AxiosResponse } from 'axios';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import List from './index';
import Fetcher from '../../api/fetcher';

jest.mock('../../api/fetcher');

const MockedFetcher = jest.mocked(Fetcher, true);

describe('List', () => {
  let router: ReturnType<typeof createMemoryRouter>;
  beforeEach(() => {
    router = createMemoryRouter(
      [
        { path: '/account', element: null },
        { path: '/list', element: <List /> },
      ],
      {
        initialEntries: ['/list'],
      },
    );

    render(<RouterProvider router={router} />);
  });

  test('페이지 헤더', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '로직 목록',
    );
  });

  test('비로그인 시 리다이렉트', async () => {
    MockedFetcher.prototype.get.mockRejectedValue(
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

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/account');
    });
  });
});
