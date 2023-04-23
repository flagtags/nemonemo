import { useState } from 'react';
import { redirect, useNavigate, useNavigation } from 'react-router-dom';
import Fetcher from '../../../api/fetcher';
import { PasswordValidator, NameValidator } from '@/service/account';
import validateForm from '@/util/validateForm';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onLoginPress = () => {
    const loginFetcher = new Fetcher('/user/login');

    const onSuccess = () => {
      loginFetcher
        .post({
          userName,
          password,
        })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          // console.error(error);
          window.alert('로그인 실패!');
        });
    };
    const validators = [
      new NameValidator(userName),
      new PasswordValidator(password),
    ];

    validateForm({
      onSuccess,
      validators,
    });
  };

  return (
    <>
      <h1>로그인</h1>
      <input
        type="text"
        placeholder="아이디"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />
      <input
        type="password"
        placeholder="비밀번호 "
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={onLoginPress}>로그인</button>
    </>
  );
};

export default Login;
