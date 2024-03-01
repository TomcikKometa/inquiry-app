import { Routes } from '@angular/router';

export enum RoutesPaths {
  ADMIN_PANEL = 'admin-panel'
}

export const routes: Routes = [
  {
    path: RoutesPaths.ADMIN_PANEL,
    loadComponent: () =>
      import('./features/admin-panel/containers/admin-panel-container/admin-panel-container.component').then(
        c => c.AdminPanelContainerComponent
      )
  },
  {
    path: '**',
    redirectTo: RoutesPaths.ADMIN_PANEL
  }
];
