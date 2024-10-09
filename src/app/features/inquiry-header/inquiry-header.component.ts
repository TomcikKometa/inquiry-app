import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../core/services/store/store.service';
import { NavigationService } from '../../core/services/navigation/navigation.service';

@Component({
  selector: 'inq-inquiry-header',
  standalone: true,
  imports: [],
  templateUrl: './inquiry-header.component.html',
  styleUrl: './inquiry-header.component.css'
})
export class InquiryHeaderComponent {
  @Output() public openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public isLogin: EventEmitter<boolean> = new EventEmitter<boolean>();

  private readonly router:Router = inject(Router);
  private readonly storeService: StoreService = inject(StoreService);
  private readonly navigationService: NavigationService = inject(NavigationService);

  protected login():void{
    this.storeService.setLoggedIn(false);
    this.router.navigate(['login'])
  }

  protected navigateTo(action:string):void{
    action == 'pollster-panel' ? (this.navigationService.navigateToPollsterMainDashboard()) : 0;
  }
}
