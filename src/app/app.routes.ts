import { Routes } from '@angular/router';
import { authenticationGuard } from './core/guard/authentication.guard';

export enum RoutesPaths {
  POLLSTER_PANEL = 'pollster-panel',
  USER_PANEL = 'user_panel',
  LOGIN = 'login',
  REGISTER = 'register',
}

export const routes: Routes = [
  {
    path: RoutesPaths.LOGIN,
    loadComponent: () => import('./features/shared-components/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: RoutesPaths.USER_PANEL,
    loadComponent: () =>
      import('./features/user-panel/containers/user-panel-container/user-panel-container.component').then(
        c => c.UserPanelContainerComponent
      )
  },
  {
    path: RoutesPaths.POLLSTER_PANEL,
    loadComponent: () =>
      import('./features/pollster-panel/containers/pollster-panel/pollster-panel-container.component').then(
        c => c.PollsterPanelContainerComponent
      ),
      // canActivate:[authenticationGuard]
  },
  {path:RoutesPaths.REGISTER,
    loadComponent: () => import('./features/shared-components/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: '**',
    redirectTo: RoutesPaths.LOGIN
  }
];
