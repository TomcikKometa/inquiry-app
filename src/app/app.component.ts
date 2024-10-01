import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InquiryHeaderComponent } from './features/inquiry-header/inquiry-header.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { LoginComponent } from './features/shared-components/login/login.component';
import { RegisterComponent } from './features/shared-components/register/register.component';
import { first, Observable } from 'rxjs';
import { StoreService } from './core/services/store/store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [LoginComponent],
  imports: [RegisterComponent, RouterOutlet, InquiryHeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  protected isSidebar: boolean = true;
  protected isRegister: boolean = false;
  private readonly storeService: StoreService = inject(StoreService);
  isLogin$ = this.storeService.isLoggedIn$();

  ngOnInit(): void {
   this.isLogin$.pipe().subscribe(x => console.log(x)
   )
   
  }

  protected getSidenavEvent(event: boolean) {
    if (event) {
      this.isSidebar = !this.isSidebar;
    }
  }

}
