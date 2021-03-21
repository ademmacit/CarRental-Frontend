import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { rentalDetail } from '../models/rentalDetail';

@Injectable({
  providedIn: 'root',
})
export class RentalDetailService {
  apiUrl: string = 'https://localhost:44330/api/rentals/GetRentalDetails';
  constructor(private httpClient: HttpClient) {}

  getRentalDetails(): Observable<listResponseModel<rentalDetail>> {
    return this.httpClient.get<listResponseModel<rentalDetail>>(this.apiUrl);
  }
}
