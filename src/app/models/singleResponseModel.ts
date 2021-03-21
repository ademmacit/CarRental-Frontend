import { responseModel } from './responseModel';

export interface singleResponseModel<T> extends responseModel {
  data: T;
}
