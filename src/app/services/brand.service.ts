import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { responseModel } from '../models/responseModel';
import { singleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl: string = 'https://localhost:44330/api/brands';

  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<listResponseModel<Brand>> {
    let newUrl: string = this.apiUrl + '/GetAll';
    return this.httpClient.get<listResponseModel<Brand>>(newUrl);
  }

  getBrandById(brandId: number): Observable<singleResponseModel<Brand>> {
    let newUrl: string = this.apiUrl + '/getById';
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    const params = new HttpParams().append('id', brandId.toString());

    return this.httpClient.get<singleResponseModel<Brand>>(newUrl, {
      headers: headers,
      params: params,
    });
  }

  add(brand: Brand): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/add';
    return this.httpClient.post<responseModel>(newUrl, brand);
  }

  delete(brand: Brand): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/delete';
    return this.httpClient.post<responseModel>(newUrl, brand);
  }

  update(brand: Brand): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/update';
    return this.httpClient.post<responseModel>(newUrl, brand);
  }
}
