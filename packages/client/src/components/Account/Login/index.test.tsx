import { render, screen, waitFor } from '@testing-library/react';
import { AxiosError } from 'axios';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Login from '.';
import Fetcher from '../../../api/fetcher';

jest.mock('../../../api/fetcher');

const MockedFetcher = jest.mocked(Fetcher, true);

describe('로그인 컴포넌트', () => {
  let router: ReturnType<typeof createMemoryRouter>;
  beforeEach(() => {
    router = createMemoryRouter(
      [
        { path: '/account', element: <Login /> },
        { path: '/', element: null },
      ],
      {
        initialEntries: ['/account'],
      },
    );

    render(<RouterProvider router={router} />);
  });

  describe('렌더링', () => {
    test('헤더에 "로그인"이라고 표시된다.', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        '로그인',
      );
    });

    test('아이디 입력창 렌더링 ', () => {
      expect(screen.getByPlaceholderText('아이디')).not.toBe(null);
    });

    test('비밀번호 입력창 렌더링 ', () => {
      expect(screen.getByPlaceholderText('비밀번호')).not.toBe(null);
    });

    test('로그인 버튼 렌더링 ', () => {
      expect(
        screen.getByRole('button', {
          name: '로그인',
        }),
      ).not.toBe(null);
    });
  });

  describe('로그인 시도', () => {
    let loginButton: HTMLButtonElement;
    let idInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;

    beforeEach(async () => {
      idInput = screen.getByPlaceholderText('아이디');
      passwordInput = screen.getByPlaceholderText('비밀번호');
      loginButton = screen.getByRole('button', {
        name: '로그인',
      });

      await userEvent.type(idInput, 'id');
      await userEvent.type(passwordInput, 'password');
    });

    test('로그인 성공 ', async () => {
      MockedFetcher.prototype.post.mockResolvedValue({});
      loginButton.click();

      await waitFor(() => expect(router.state.location.pathname).toBe('/'));
    });

    test('로그인 실패 ', async () => {
      MockedFetcher.prototype.post.mockRejectedValue(
        new AxiosError('로그인 실패!'),
      );

      await userEvent.click(loginButton);

      await waitFor(async () =>
        expect(window.alert).toBeCalledWith('로그인 실패!'),
      );
    });
  });
});
