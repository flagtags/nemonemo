import { render, screen, waitFor } from '@testing-library/react';
import { AxiosError } from 'axios';
import { StaticRouter } from 'react-router-dom/server';
import Login from '.';
import Fetcher from '../../../api/fetcher';

jest.mock('../../../api/fetcher');

const MockedFetcher = jest.mocked(Fetcher, true);

describe('로그인 컴포넌트', () => {
  beforeEach(() => {
    render(
      <StaticRouter location="http://localhost:9999/account">
        <Login />
      </StaticRouter>,
    );
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
    beforeEach(() => {
      loginButton = screen.getByRole('button', {
        name: '로그인',
      });
    });

    test('로그인 성공 ', async () => {
      MockedFetcher.prototype.post.mockResolvedValue({});
      loginButton.click();

      expect(window.location.pathname).toBe('/');
    });

    test('로그인 실패 ', () => {
      // window.alert = jest.fn();

      MockedFetcher.prototype.post.mockRejectedValue(
        new AxiosError('로그인 실패!'),
      );

      loginButton.click();

      waitFor(() => expect(window.alert).toBeCalledWith('로그인 실패!'));
    });
  });
});
