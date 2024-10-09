import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, ViewEncapsulation  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InquiryHeaderComponent } from './features/inquiry-header/inquiry-header.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { LoginComponent } from './features/shared-components/login/login.component';
import { RegisterComponent } from './features/shared-components/register/register.component';
import { StoreService } from './core/services/store/store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  encapsulation:ViewEncapsulation.None,
  providers: [LoginComponent],
  imports: [RegisterComponent, RouterOutlet, InquiryHeaderComponent, SidebarComponent, CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected isSidebar: boolean = true;
  protected isRegister: boolean = false;
  private readonly storeService: StoreService = inject(StoreService);
  protected isLogin$ = this.storeService.isLoggedIn$();
  protected isCenterView$ = this.storeService.isCenterView$();

  protected getSidenavEvent(event: boolean) {
    if (event) {
      this.isSidebar = !this.isSidebar;
    }
  }
}
