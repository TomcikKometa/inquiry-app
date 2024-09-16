import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserLoginResponse } from './models/user-login-response';
import { HttpClient } from '@angular/common/http';
import { ApiUserUrl } from '../../../@config/api-adress';
import { UserApiMapper } from './user-mapper/user-api-mapper';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private readonly http: HttpClient = inject(HttpClient);

  public login(loginFormGroup: FormGroup): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(
      ApiUserUrl.USER_LOGIN_URL,
      UserApiMapper.mapUserLoginRequest(loginFormGroup)
    );
  }
}
