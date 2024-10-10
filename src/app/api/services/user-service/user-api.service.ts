import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable, pipe, tap } from 'rxjs';
import { UserLoginResponse } from './models/user-login-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserApiMapper } from './user-mapper/user-api-mapper';
import { UserCreateRequest } from './models/user-login-request';
import { ApiUserUrl } from '../../../config/api-adress';
import { StoreService } from '../../../core/services/store/store.service';
import { NavigationService } from '../../../core/services/navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly storeService: StoreService = inject(StoreService);
  private readonly navigationService: NavigationService = inject(NavigationService);

  public login(loginFormGroup: FormGroup): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(
      ApiUserUrl.USER_LOGIN_URL,
      UserApiMapper.mapUserLoginRequest(loginFormGroup), {
        observe: 'response',headers:new HttpHeaders({'Access-Control-Allow-Methods':'POST'})
      })
      .pipe(
        map(response => {
         console.log(response.headers.keys());
         return  response.body as UserLoginResponse;
        })
      );
  }

  public registerUser(registerFormGroup: FormGroup): Observable<UserLoginResponse> {
    return this.http
      .post<UserLoginResponse>(ApiUserUrl.USER_CREATE_URL, UserApiMapper.mapRegisterModel(registerFormGroup), {
        observe: 'response',headers:new HttpHeaders({'X-Pagination': '1 '})
      })
      .pipe(
        map(response => {
         console.log(response.headers.keys());
         return  response.body as UserLoginResponse;
        })
      );
  }

  // public getUserInfo(id:number):UserDetails{
  //   this.http.get<>
  // }
}
