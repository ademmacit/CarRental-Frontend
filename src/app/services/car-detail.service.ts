import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { carDetail } from '../models/carDetail';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  apiUrl: string = 'https://localhost:44330/api/cars';
  constructor(private httpClient: HttpClient) {}

  getCarDetails(): Observable<listResponseModel<carDetail>> {
    let newUrl: string = this.apiUrl + '/getCarDetails';
    return this.httpClient.get<listResponseModel<carDetail>>(newUrl);
  }

  getCarDetailsByBrand(
    brandId: number
  ): Observable<listResponseModel<carDetail>> {
    let newUrl: string =
      this.apiUrl + '/getCarDetailsByBrand?brandId=' + brandId;
    return this.httpClient.get<listResponseModel<carDetail>>(newUrl);
  }

  getCarDetailsByColor(
    colorId: number
  ): Observable<listResponseModel<carDetail>> {
    let newUrl: string =
      this.apiUrl + '/getCarDetailsByColor?colorId=' + colorId;
    return this.httpClient.get<listResponseModel<carDetail>>(newUrl);
  }
}
