import { carDetail } from './carDetail';
import { responseModel } from './responseModel';

export interface carDetailResponseModel extends responseModel {
  data: carDetail[];
}
