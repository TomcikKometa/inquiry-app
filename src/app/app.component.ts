import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InquiryHeaderComponent } from './features/inquiry-header/inquiry-header.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { LoginComponent } from './features/shared-components/login/login.component';
import { RegisterComponent } from './features/shared-components/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [RegisterComponent, RouterOutlet, InquiryHeaderComponent, SidebarComponent,LoginComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected isSidebar: boolean = true;

  protected getSidenavEvent(event: boolean) {
    if (event) {
      this.isSidebar = !this.isSidebar;
    }
  }
}
