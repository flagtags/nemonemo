import Validator from './validator';

interface IValidateForm {
  onSuccess: () => void;
  validators: Validator[];
}

export default function validateForm({ onSuccess, validators }: IValidateForm): void {
  const allValidated = validators.every((validator) => validator.validate());
  if (allValidated) onSuccess();
}
