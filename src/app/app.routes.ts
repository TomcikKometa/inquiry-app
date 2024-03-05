import { Routes } from '@angular/router';

export enum RoutesPaths {
  TABLE_PANEL = 'admin-panel',
  LOGIN = 'login'
}

export const routes: Routes = [
  {
    path: RoutesPaths.LOGIN,
    loadComponent: () =>
      import('./features/admin-panel/components/login/login.component').then(
        c => c.LoginComponent
      )
  },
  {
    path: RoutesPaths.TABLE_PANEL,
    loadComponent: () =>
      import('./features/admin-panel/containers/dashboard-panel-container/dashboard-panel-container.component').then(
        c => c.DashboardPanelContainerComponent
      )
  },
  {
    path: '**',
    redirectTo: RoutesPaths.LOGIN
  }
];
