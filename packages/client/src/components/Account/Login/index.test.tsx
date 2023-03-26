import React from 'react';
import { AxiosError } from 'axios';
import { screen, render } from '@testing-library/react';
import Login from '.';
import Fetcher from '../../../api/fetcher';

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
});
