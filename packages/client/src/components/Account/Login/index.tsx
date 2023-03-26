import { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import Fetcher from '../../../api/fetcher';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onLoginPress = () => {
    const loginFetcher = new Fetcher('/user/login');

    loginFetcher
      .post({
        userName,
        password,
      })
      .then(() => {
        console.log('로그인 성공!');

        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        window.alert('로그인 실패!');
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