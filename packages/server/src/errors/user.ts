enum UserError {
  DUPLIACED_USER = 202,
  USER_NOT_FOUND = 203,
}

export class DuplicatedUserError extends Error {
  code: number;

  constructor() {
    super('Duplicated User');

    this.code = UserError.DUPLIACED_USER;
  }
}

export class UserNotFoundError extends Error {
  code: number;
  
  constructor() {
    super('User Not Found');

    this.code = UserError.USER_NOT_FOUND;
  }
}