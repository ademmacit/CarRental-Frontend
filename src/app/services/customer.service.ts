import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { customerResponseModel } from '../models/customerResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl: string = 'https://localhost:44330/api/customers/GetAll';
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<customerResponseModel> {
    return this.httpClient.get<customerResponseModel>(this.apiUrl);
  }
}
