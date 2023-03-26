// Login 헤더
// 아이디, 비밀번호 텍스필드(palceholder)
// login button

import { render, screen } from '@testing-library/react';
import { AxiosError } from 'axios';
import Login from '.';
import Fetcher from '../../../api/fetcher';

jest.mock('../../../api/fetcher');

const MockedFetcher = jest.mocked(Fetcher, true);

describe('로그인 컴포넌트', () => {
  beforeEach(() => {
    render(<Login />);
  });

  describe('렌더링', () => {
    test('헤더에 "로그인"이라고 표시된다.', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('로그인');
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
    beforeEach(() => {
      const loginButton = screen.getByRole('button', {
        name: '로그인',
      });

      loginButton.click();
    });

    test('로그인 성공 ', () => {
      expect(window.location).toBe('http://localhost:3000/');
    });

    test('로그인 실패 ', () => {
      window.alert = jest.fn();

      MockedFetcher.prototype.post.mockRejectedValue(new AxiosError('로그인 실패!'));

      expect(window.alert).toBeCalledWith('로그인 실패!');
    });
  });
});
