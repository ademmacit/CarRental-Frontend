import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { singleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'https://localhost:44330/api/auth';

  constructor(private httpClient: HttpClient) {}

  login(user: LoginModel): Observable<singleResponseModel<TokenModel>> {
    let newUrl: string = this.apiUrl + '/login';
    return this.httpClient.post<singleResponseModel<TokenModel>>(newUrl, user);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
