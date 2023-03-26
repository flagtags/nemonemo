export class DuplicatedUserError extends Error {
  constructor() {
    super('Duplicated User');
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super('User Not Found');
  }
}

export class NotAuthenticatedError extends Error {
  constructor() {
    super('Wrong password');
  }
}

export class NotAuthorizedError extends Error {
  constructor() {
    super('Not Authorized');
  }
}
