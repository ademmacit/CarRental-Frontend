import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { responseModel } from '../models/responseModel';
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

  register(user: RegisterModel): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/register';
    return this.httpClient.post<responseModel>(newUrl, user);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
