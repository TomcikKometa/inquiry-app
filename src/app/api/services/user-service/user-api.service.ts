import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { UserLoginResponse } from './models/user-login-response';
import { HttpClient } from '@angular/common/http';
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
  private readonly navigationService:NavigationService = inject(NavigationService);

  public login(loginFormGroup: FormGroup): Observable<UserLoginResponse> {
    return this.http
      .post<UserLoginResponse>(ApiUserUrl.USER_LOGIN_URL, UserApiMapper.mapUserLoginRequest(loginFormGroup))}

  public registerUser(registerFormGroup: FormGroup): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(
      ApiUserUrl.USER_CREATE_URL,
      UserApiMapper.mapRegisterModel(registerFormGroup)
    );
  }
}
