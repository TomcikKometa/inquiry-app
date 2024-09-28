import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavigationService } from '../services/navigation/navigation.service';
import { StoreService } from '../services/store/store.service';

@Injectable({
  providedIn: 'root'
})
private readonly store: StoreService = inject(StoreService);
private readonly navigationService: NavigationService = inject(NavigationService);

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
