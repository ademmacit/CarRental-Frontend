import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { responseModel } from '../models/responseModel';
import { singleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl: string = 'https://localhost:44330/api/colors';
  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<listResponseModel<Color>> {
    let newUrl: string = this.apiUrl + '/GetAll';
    return this.httpClient.get<listResponseModel<Color>>(newUrl);
  }

  getColorById(colorId: number): Observable<singleResponseModel<Color>> {
    let newUrl: string = this.apiUrl + '/getById';
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    const params = new HttpParams().append('id', colorId.toString());

    return this.httpClient.get<singleResponseModel<Color>>(newUrl, {
      headers: headers,
      params: params,
    });
  }

  add(color: Color): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/add';
    return this.httpClient.post<responseModel>(newUrl, color);
  }

  delete(color: Color): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/delete';
    return this.httpClient.post<responseModel>(newUrl, color);
  }

  update(color: Color): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/update';
    return this.httpClient.post<responseModel>(newUrl, color);
  }
}
