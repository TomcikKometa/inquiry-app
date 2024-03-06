import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesPaths } from '../../../app.routes';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly router: Router = inject(Router);

  public navigateToTableListUser(): void {
    this.router.navigate([RoutesPaths.USER_PANEL]);
  }

  public navigateToTableListPollster(): void {
    this.router.navigate([RoutesPaths.POLLSTER_PANEL]);
  }
}
