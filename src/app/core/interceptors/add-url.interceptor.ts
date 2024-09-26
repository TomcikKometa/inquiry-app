import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const addUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const backendUrl:string = 'http://localhost:3000/api';
  const backandRequest : HttpRequest<unknown>= req.clone({url:backendUrl + req.url})
  return next(backandRequest);
};
