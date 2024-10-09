import { Routes } from '@angular/router';
import { authenticationGuard } from './core/guard/authentication.guard';

export enum RoutesPaths {
  POLLSTER_PANEL = 'pollster-panel',
  USER_PANEL = 'user_panel',
  LOGIN = 'login',
  REGISTER = 'register',
  INQUIRY_TABLE_EDIT = 'inquity-table-edit',
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
      ),
      canActivate:[authenticationGuard]
  },
  {
    path: RoutesPaths.POLLSTER_PANEL,
    loadComponent: () =>
      import('./features/pollster-panel/containers/pollster-panel/pollster-panel-container.component').then(
        c => c.PollsterPanelContainerComponent
      ),
      canActivate:[authenticationGuard]
  },
  {path:RoutesPaths.REGISTER,
    loadComponent: () => import('./features/shared-components/register/register.component').then(c => c.RegisterComponent)
  },
  {path:RoutesPaths.INQUIRY_TABLE_EDIT,
    loadComponent: () => import('./features/pollster-panel/components/inquiry-table-edit/inquiry-table-edit.component').then(c => c.InquiryTableEditComponent)
  },
  {
    path: '**',
    redirectTo: RoutesPaths.LOGIN
  }
];
