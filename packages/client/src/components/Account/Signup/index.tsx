import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fetcher from '../../../api/fetcher';
import validateForm from '../../../util/validateForm';
import {
  PasswordValidator,
  NameValidator,
  UserNameValidator,
} from '@/service/account';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const onSignUpPress = () => {
    const onSuccess = () => {
      new Fetcher('/user/register')
        .post({
          userName,
          password,
          name,
        })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error(error);
          window.alert('회원가입 실패!');
        });
    };

    const validators = [
      new UserNameValidator(userName),
      new PasswordValidator(password),
      new NameValidator(name),
    ];

    validateForm({ onSuccess, validators });
  };

  return (
    <>
      <h1>회원가입</h1>
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
      <input
        type="text"
        placeholder="이름 "
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button onClick={onSignUpPress}>회원가입</button>
    </>
  );
};

export default SignUp;
