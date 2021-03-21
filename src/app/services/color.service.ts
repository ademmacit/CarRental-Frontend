import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl: string = 'https://localhost:44330/api/colors/GetAll';
  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<listResponseModel<Color>> {
    return this.httpClient.get<listResponseModel<Color>>(this.apiUrl);
  }
}
