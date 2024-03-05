import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesPaths } from '../../../app.routes';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly router: Router = inject(Router);

  public navigateToTableList(): void {
    this.router.navigate([RoutesPaths.TABLE_PANEL]);
  }
}
