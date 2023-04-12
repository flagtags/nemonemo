import Validator from '@/util/validator';

export class PasswordValidator extends Validator {
  get isValid() {
    return !!this.formValue;
  }

  onFail() {
    window.alert('비밀번호를 입력해주세요.');
  }
}

export class UserNameValidator extends Validator {
  get isValid() {
    return !!this.formValue;
  }

  onFail() {
    window.alert('아이디를 입력해주세요.');
  }
}

export class NameValidator extends Validator {
  get isValid() {
    return !!this.formValue;
  }

  onFail() {
    window.alert('이름을 입력해주세요.');
  }
}
