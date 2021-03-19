import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { carDetailResponseModel } from '../models/carDetailResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  apiUrl: string = 'https://localhost:44330/api/cars/getCarDetails';
  constructor(private httpClient: HttpClient) {}

  getCarDetails(): Observable<carDetailResponseModel> {
    return this.httpClient.get<carDetailResponseModel>(this.apiUrl);
  }
}
