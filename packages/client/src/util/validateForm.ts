interface IInput {
  [key: string]: any;
}

interface IValidateForm<T> {
  inputs: T;
  onSuccess: () => void;
  onFail: (name: keyof T) => void;
  validators: {
    [key in keyof T]: (value: T[key]) => boolean;
  };
}

export default function validateForm<F extends IInput>({
  inputs,
  onSuccess,
  onFail,
  validators,
}: IValidateForm<F>): void {
  const failedKey = Object.keys(inputs).find((key) => !validators[key](inputs[key]));

  if (failedKey) {
    onFail(failedKey);
  }
  onSuccess();
}

type A = IValidateForm<{ userName: string; password: string; name: string }>;

validateForm({
  inputs: {
    userName: 'test',
    password: 'test',
    name: 'test',
  },
  onFail: (key) => {},
  onSuccess: () => {},
  validators: {
    userName: (value) => value.length > 3,
    password: (value) => value.length > 3,
    name: (value) => value.length > 3,
  },
});
