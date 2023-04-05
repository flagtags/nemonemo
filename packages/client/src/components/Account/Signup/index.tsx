import { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import Fetcher from '../../../api/fetcher';
import validateForm from '../../../util/validateForm';

interface IInput {
  userName: string;
  password: string;
  name: string;
}

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const onSignUpPress = () => {
    const inputs = {
      userName,
      password,
      name,
    };

    const onFail = (key: keyof typeof validationMessage) => {
      const validationMessage = {
        userName: '아이디를 입력해주세요.',
        password: '비밀번호를 입력해주세요.',
        name: '이름을 입력해주세요.',
      };
      window.alert(validationMessage[key]);
    };

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

    const validate = (value: string) => !!value;
    const validators = {
      userName: validate,
      password: validate,
      name: validate,
    };

    validateForm({ inputs, onSuccess, onFail, validators });
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
