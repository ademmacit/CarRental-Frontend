import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { brandResponseModel } from '../models/brandResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl: string = 'https://localhost:44330/api/brands/GetAll';

  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<brandResponseModel> {
    return this.httpClient.get<brandResponseModel>(this.apiUrl);
  }
}
