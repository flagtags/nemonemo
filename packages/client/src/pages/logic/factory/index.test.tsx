// 제목, 빈 격자, 제한시간, 사이즈,
// 제목 입력창
// 사이즈 입력창(default 5, 값에 따라 빈격자 크기가 변화)
// 제한시간 입력창
// submit
import ErrorBoundary from '@/components/ErrorBoundary';
import { Redirect } from '@/components/Redirect';
import { Suspense } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import LogicFactory, { DEFAULT_SIZE } from '.';
import { QueryClient, QueryClientProvider } from 'react-query';
import userEvent from '@testing-library/user-event';

describe('로직 팩토리', () => {
  let router;

  beforeEach(() => {
    router = createMemoryRouter(
      [
        { path: '/account', element: null },
        { path: '/list', element: null },
        {
          path: '/logic/factory',
          element: (
            <ErrorBoundary fallback={<Redirect path="/account" />}>
              <Suspense fallback="로딩중..">
                <LogicFactory />,
              </Suspense>
            </ErrorBoundary>
          ),
        },
      ],
      {
        initialEntries: ['/logic/factory'],
      },
    );

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
  });

  test('제목, 빈 격자, 제한시간, 사이즈 입력란, 제출 버튼 존재 확인', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '네모네모 로직을 직접 만들어봐요!',
    );
    expect(screen.getByLabelText('제목 :')).toBeInTheDocument();
    expect(screen.getByLabelText('제한시간 :')).toBeInTheDocument();
    expect(screen.getByLabelText('사이즈 :')).toBeInTheDocument();
    expect(screen.getByRole('logic-form')).toBeInTheDocument();
    expect(screen.getByRole('apply-size')).toBeInTheDocument();
    expect(screen.getByRole('submit')).toBeInTheDocument();
  });

  test('사이즈 입력에 따른 격자 크기 조정', () => {
    const sizeInput = screen.getByLabelText('사이즈 :');
    const applyButton = screen.getByRole('apply-size');

    userEvent.type(sizeInput, '3');
    expect(screen.getAllByRole('row')).toHaveLength(DEFAULT_SIZE);

    userEvent.click(applyButton);

    expect(screen.getAllByRole('row')).toHaveLength(3);
  });

  test('로직 제출', () => {});
});
