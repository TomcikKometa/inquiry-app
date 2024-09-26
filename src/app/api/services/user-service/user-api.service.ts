import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { first, Observable, tap } from 'rxjs';
import { UserLoginResponse } from './models/user-login-response';
import { HttpClient } from '@angular/common/http';
import { ApiUserUrl } from '../../../config/api-adress';
import { UserApiMapper } from './user-mapper/user-api-mapper';
import { StoreService } from '../../../@core/services/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private readonly http: HttpClient = inject(HttpClient);

  private readonly storeService: StoreService = inject(StoreService);

  public login(loginFormGroup: FormGroup): Observable<UserLoginResponse> {
    return this.http
      .post<UserLoginResponse>(ApiUserUrl.USER_LOGIN_URL, UserApiMapper.mapUserLoginRequest(loginFormGroup))
      .pipe(
        first(),
        tap((response: UserLoginResponse) => {
          this.storeService.saveUserToken(response.token), this.storeService.saveUserID(response.id),this.storeService.setLoggedIn(true);
        })
      );
  }

  public registerUser(registerFormGroup: FormGroup): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(
      ApiUserUrl.USER_CREATE_URL,
      UserApiMapper.mapRegisterModel(registerFormGroup)
    );
  }
}
