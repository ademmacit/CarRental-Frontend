import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { rentalDetailResponseModel } from '../models/rentalDetailResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalDetailService {
  apiUrl: string = 'https://localhost:44330/api/rentals/GetRentalDetails';
  constructor(private httpClient: HttpClient) {}

  getRentalDetails(): Observable<rentalDetailResponseModel> {
    return this.httpClient.get<rentalDetailResponseModel>(this.apiUrl);
  }
}
