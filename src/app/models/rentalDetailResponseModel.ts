import { rentalDetail } from './rentalDetail';
import { responseModel } from './responseModel';

export interface rentalDetailResponseModel extends responseModel {
  data: rentalDetail[];
}
