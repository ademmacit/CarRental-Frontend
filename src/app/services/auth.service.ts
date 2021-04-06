import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { responseModel } from '../models/responseModel';
import { singleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserInfo } from '../models/userInfo';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'https://localhost:44330/api/auth';

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(user: LoginModel): Observable<singleResponseModel<TokenModel>> {
    let newUrl: string = this.apiUrl + '/login';
    return this.httpClient.post<singleResponseModel<TokenModel>>(newUrl, user);
  }

  register(user: RegisterModel): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/register';
    return this.httpClient.post<responseModel>(newUrl, user);
  }

  updateUserInfo(userInfo: UserInfo): Observable<responseModel> {
    let newUrl: string = this.apiUrl + '/updateUserInfo';
    return this.httpClient.post<responseModel>(newUrl, userInfo);
  }

  isAuthenticated(): boolean {
    if (this.localStorageService.Get('token')) {
      return true;
    } else {
      return false;
    }
  }

  getUserByEmail(mail: string): Observable<singleResponseModel<UserInfo>> {
    let newUrl: string = this.apiUrl + '/getUserInfoByMail';
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    const params = new HttpParams().append('eMail', mail.toString());

    return this.httpClient.get<singleResponseModel<UserInfo>>(newUrl, {
      headers: headers,
      params: params,
    });
  }
}
