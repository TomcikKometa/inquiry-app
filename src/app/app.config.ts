import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import localeGb from '@angular/common/locales/en-GB';
import { InquiryApiService } from './@api/services/inquiry-service/inquiry-api.service';
import { InquiryService } from './@api/services/inquiry-service/inquiry.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { addUrlInterceptor } from './@core/interceptors/add-url.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr(),
    { provide: LOCALE_ID, useFactory: getLanguage },
    { provide: InquiryService, useClass: InquiryApiService },
    provideHttpClient(withInterceptors([addUrlInterceptor]))
  ]
};

function getLanguage(): string {
  const windowLanguage = window.navigator.language;

  if (windowLanguage?.toLowerCase().includes('pl')) {
    registerLocaleData(localePl);
    return windowLanguage;
  }
  registerLocaleData(localeGb);
  return windowLanguage;
}
