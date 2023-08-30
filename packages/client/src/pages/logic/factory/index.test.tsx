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
import Fetcher from '@/api/fetcher';
import { CELL_STATE } from '@/types/logic';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

jest.mock('@/api/fetcher');

const MockedFetcher = jest.mocked(Fetcher, true);

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

  test('사이즈 입력에 따른 격자 크기 조정', async () => {
    const user = userEvent.setup();
    const sizeInput = screen.getByRole('sizeInput');
    const applyButton = screen.getByRole('apply-size');

    await user.type(sizeInput, '3');
    expect(screen.getAllByRole('row')).toHaveLength(DEFAULT_SIZE);

    await user.click(applyButton);

    expect(screen.getAllByRole('row')).toHaveLength(3);
  });

  test('로직 제출', async () => {
    const user = userEvent.setup();

    MockedFetcher.prototype.post.mockResolvedValue(undefined);

    const submitButton = screen.getByRole('submit');
    const titleInput = screen.getByLabelText('제목 :');
    const timeLimit = screen.getByLabelText('제한시간 :');
    const size = screen.getByLabelText('사이즈 :');
    const applyButton = screen.getByRole('apply-size');
    const [firstCell, ...restCells] = screen.getAllByRole('cell_button');

    await user.type(titleInput, 'title');
    timeLimit.focus();
    await user.type(timeLimit, '30000');
    await user.type(size, '6');
    user.click(applyButton);

    await user.click(firstCell);

    await user.click(submitButton);

    expect(MockedFetcher).toBeCalledWith('/logic');
    expect(MockedFetcher.prototype.post).toBeCalledWith({
      title: 'title',
      timeLimit: 30000,
      size: 6,
      answer: [
        [
          CELL_STATE.FILL,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
        ],
        [
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
        ],
        [
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
        ],
        [
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
        ],
        [
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
        ],
        [
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
          CELL_STATE.BLANK,
        ],
      ],
    });
  });
});
