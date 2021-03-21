import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl: string = 'https://localhost:44330/api/customers/GetAll';
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<listResponseModel<Customer>> {
    return this.httpClient.get<listResponseModel<Customer>>(this.apiUrl);
  }
}
