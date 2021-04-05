import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Customerfindeks } from '../models/customerFindeks';
import { singleResponseModel } from '../models/singleResponseModel';
import { Observable } from 'rxjs';
import { responseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class FindeksMockService {
  apiUrl: string = 'https://localhost:44330/api/customerfindeks';

  constructor(private httpClient: HttpClient) {}

  add(customerFindeks: Customerfindeks): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/add';
    return this.httpClient.post<responseModel>(newUrl, customerFindeks);
  }

  getFindeksByCustomerId(
    customerId: number
  ): Observable<singleResponseModel<Customerfindeks>> {
    let newUrl: string = this.apiUrl + '/getByCustomerId';
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    const params = new HttpParams().append('id', customerId.toString());

    return this.httpClient.get<singleResponseModel<Customerfindeks>>(newUrl, {
      headers: headers,
      params: params,
    });
  }
}
