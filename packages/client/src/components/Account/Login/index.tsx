import { useState } from 'react';
import { redirect } from 'react-router-dom';
import Fetcher from '../../../api/fetcher';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {
    const loginFetcher = new Fetcher('/user/login');

    loginFetcher
      .post({
        userName,
        password,
      })
      .then(() => {
        redirect('/');
      })
      .catch((error) => {
        window.alert('로그인 실패!!');
      });
  };

  return (
    <>
      <h1>로그인</h1>
      <input
        placeholder="아이디"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />
      <input
        placeholder="비밀번호 "
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={onLoginPress}>로그인</button>
    </>
  );
};

export default Login;
