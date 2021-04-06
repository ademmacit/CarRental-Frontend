import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { responseModel } from '../models/responseModel';
import { singleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  apiUrl: string = 'https://localhost:44330/api/creditCard';

  constructor(private httpClient: HttpClient) {}

  add(creditCard: CreditCard): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/add';
    return this.httpClient.post<responseModel>(newUrl, creditCard);
  }

  getByUserId(userId: number): Observable<singleResponseModel<CreditCard>> {
    let newUrl: string = this.apiUrl + '/getByUserId';
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    const params = new HttpParams().append('userId', userId.toString());

    return this.httpClient.get<singleResponseModel<CreditCard>>(newUrl, {
      headers: headers,
      params: params,
    });
  }
}
