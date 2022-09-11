enum UserError {
  DUPLIACED_USER = 202,
}

export class DuplicatedUserError extends Error {
  code: number;

  constructor() {
    super('Duplicated User');

    this.code = UserError.DUPLIACED_USER;
  }
}
