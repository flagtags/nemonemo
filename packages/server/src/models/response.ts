export interface IModelResponse<T> {
  response: T;
  matched?: number;
  affected?: number;
}
