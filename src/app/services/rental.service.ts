import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { responseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl: string = 'https://localhost:44330/api/rentals/';
  constructor(private httpClient: HttpClient) {}

  addRental(rental: Rental): Observable<responseModel> {
    let newUrl: string = this.apiUrl + 'add';
    return this.httpClient.post<responseModel>(newUrl, rental);
  }
}
