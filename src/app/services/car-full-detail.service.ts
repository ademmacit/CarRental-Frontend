import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { carDetail } from '../models/carDetail';
import { carImage } from '../models/carImage';
import { listResponseModel } from '../models/listResponseModel';
import { singleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarFullDetailService {
  apiUrl: string = 'https://localhost:44330/api';
  constructor(private httpClient: HttpClient) {}

  getCarDetail(carId: number): Observable<singleResponseModel<carDetail>> {
    let newUrl: string =
      this.apiUrl + '/cars/getCarDetailByCarId?carId=' + carId;
    return this.httpClient.get<singleResponseModel<carDetail>>(newUrl);
  }

  getCarImages(carId: number): Observable<listResponseModel<carImage>> {
    let newUrl: string = this.apiUrl + '/carImage/getByCarId?carId=' + carId;
    return this.httpClient.get<listResponseModel<carImage>>(newUrl);
  }
}
