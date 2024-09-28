import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { NavigationService } from '../services/navigation/navigation.service';
import { StoreService } from '../services/store/store.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const store: StoreService = inject(StoreService);
  const navigationService: NavigationService = inject(NavigationService);

  if (store.getUserToken()) {
    return true;
  }
  navigationService.navigateToLogin();
  return false;
};
