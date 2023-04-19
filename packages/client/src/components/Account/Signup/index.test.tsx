import { render, screen, waitFor } from '@testing-library/react';
import { AxiosError } from 'axios';
import Fetcher from '../../../api/fetcher';
import userEvent from '@testing-library/user-event';
import { StaticRouter } from 'react-router-dom/server';
import SingUp from './index';

jest.mock('../../../api/fetcher');

const MockedFetcher = jest.mocked(Fetcher, true);

describe('회원가입', () => {
  beforeEach(() => {
    render(
      <StaticRouter location="http://localhost:9999/account">
        <SingUp />
      </StaticRouter>,
    );
  });
  describe('렌더링', () => {
    test('헤더에 "회원가입"이라고 표시된다.', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        '회원가입',
      );
    });

    test('아이디 입력창 렌더링 ', () => {
      expect(screen.getByPlaceholderText('아이디')).not.toBe(null);
    });

    test('비밀번호 입력창 렌더링 ', () => {
      expect(screen.getByPlaceholderText('비밀번호')).not.toBe(null);
    });

    test('이름 입력창 렌더링 ', () => {
      expect(screen.getByPlaceholderText('이름')).not.toBe(null);
    });

    test('회원가입 버튼 렌더링 ', () => {
      expect(
        screen.getByRole('button', {
          name: '회원가입',
        }),
      ).not.toBe(null);
    });
  });

  describe('회원가입 버튼 클릭시 동작', () => {
    let registerButton: HTMLButtonElement;

    let idInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let nameInput: HTMLInputElement;
    beforeEach(async () => {
      registerButton = await screen.findByRole('button', {
        name: '회원가입',
      });

      idInput = screen.getByPlaceholderText('아이디');
      passwordInput = screen.getByPlaceholderText('비밀번호');
      nameInput = screen.getByPlaceholderText('이름');
    });

    describe('input 채워져있는 경우', () => {
      beforeEach(() => {
        userEvent.type(idInput, 'id');
        userEvent.type(passwordInput, 'password');
        userEvent.type(nameInput, 'name');
      });

      test('회원가입 성공 ', async () => {
        MockedFetcher.prototype.post.mockResolvedValue({});

        registerButton.click();

        expect(window.location.pathname).toBe('/');
      });

      test('회원가입 실패 ', async () => {
        MockedFetcher.prototype.post.mockRejectedValue(
          new AxiosError('회원가입 실패!'),
        );

        registerButton.click();

        await waitFor(
          async () => expect(window.alert).toBeCalledWith('회원가입 실패!'),
          {
            timeout: 10000,
          },
        );

        await expect(
          waitFor(() => {
            expect(window.alert).not.toBeCalledWith('회원가입 실패!');
          }),
        ).rejects.toThrow();
      });
    });

    describe('validation', () => {
      test('아이디 입력창 미입력시 alert ', async () => {
        userEvent.type(passwordInput, 'password');
        userEvent.type(nameInput, 'name');

        registerButton.click();

        await waitFor(() =>
          expect(window.alert).toBeCalledWith('아이디를 입력해주세요.'),
        );
      });

      test('비밀번호 입력창 미입력시 alert ', async () => {
        userEvent.type(idInput, 'id');
        userEvent.type(nameInput, 'name');

        registerButton.click();

        await waitFor(() =>
          expect(window.alert).toBeCalledWith('비밀번호를 입력해주세요.'),
        );
      });

      test('이름 입력창 미입력시 alert ', async () => {
        userEvent.type(idInput, 'id');
        userEvent.type(passwordInput, 'password');

        registerButton.click();

        await waitFor(() =>
          expect(window.alert).toBeCalledWith('이름을 입력해주세요.'),
        );
      });
    });
  });
});
