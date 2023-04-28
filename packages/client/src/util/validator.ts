export default abstract class Validator {
  formValue: string;

  validate() {
    if (this.isValid) return true;

    this.onFail();
    return false;
  }

  abstract get isValid(): boolean;

  abstract onFail(): void;

  constructor(value: string) {
    this.formValue = value;
  }
}
