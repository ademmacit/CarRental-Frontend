import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { listResponseModel } from '../models/listResponseModel';
import { responseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl: string = 'https://localhost:44330/api/cars';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<listResponseModel<Car>> {
    let newUrl: string = this.apiUrl + '/getAll';
    return this.httpClient.get<listResponseModel<Car>>(newUrl);
  }

  add(car: Car): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/add';
    return this.httpClient.post<responseModel>(newUrl, car);
  }
}
