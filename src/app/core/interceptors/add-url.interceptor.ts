import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiUserUrl } from '../../config/api-adress';
import { inject } from '@angular/core';
import { NavigationService } from '../services/navigation/navigation.service';
import { StoreService } from '../services/store/store.service';
enum AuthInterceptor {
  AUTH_SCHEME = 'Bearer'
}

export function addUrlInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const url: string = request.url;
  const backendUrl: string = 'http://localhost:3000/api';
  const backandRequest: HttpRequest<unknown> = request.clone({ url: backendUrl + url });
  const navigationService: NavigationService = inject(NavigationService);
  const storeService: StoreService = inject(StoreService);
  const authorizationToken = `${AuthInterceptor.AUTH_SCHEME} ${storeService.getUserToken()}`;

  if (ApiUserUrl.USER_LOGIN_URL === url || ApiUserUrl.USER_CREATE_URL === url) {
    return next(backandRequest);
  } else {
    const req: HttpRequest<unknown> = backandRequest.clone({ setParams: { Authorization: authorizationToken } });
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (HttpStatusCode.Forbidden === error.status || HttpStatusCode.Unauthorized=== error.status) {
          navigationService.navigateToLogin();
        };
        return throwError(() => error);
      })
    );
  }
}
