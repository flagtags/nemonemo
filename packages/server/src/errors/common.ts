export class EmptyRequestError extends Error {
  constructor() {
    super('Request is empty');
  }
}
