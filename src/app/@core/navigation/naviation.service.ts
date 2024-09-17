import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesPaths } from '../../app.routes';

@Injectable({
  providedIn: 'root'
})
export class NaviationService {

  private readonly router :Router = inject(Router);

  public navitatoToRegisterComponent():void{
    this.router.navigate([RoutesPaths.REGISTER])
  }

  public navigateToPollsterMainDashboard():void{
    this.router.navigate([RoutesPaths.POLLSTER_MAIN_DASHBOARD])
  
  }
}
