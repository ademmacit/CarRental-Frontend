import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { listResponseModel } from '../models/listResponseModel';
import { responseModel } from '../models/responseModel';
import { singleResponseModel } from '../models/singleResponseModel';

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

  getCarById(carId: number): Observable<singleResponseModel<Car>> {
    let newUrl: string = this.apiUrl + '/getById';
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    const params = new HttpParams().append('id', carId.toString());

    return this.httpClient.get<singleResponseModel<Car>>(newUrl, {
      headers: headers,
      params: params,
    });
  }

  add(car: Car): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/add';
    return this.httpClient.post<responseModel>(newUrl, car);
  }

  delete(car: Car): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/delete';
    return this.httpClient.post<responseModel>(newUrl, car);
  }
  update(car: Car): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/update';
    return this.httpClient.post<responseModel>(newUrl, car);
  }
}
