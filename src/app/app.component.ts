import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InquiryHeaderComponent } from './features/inquiry-header/inquiry-header.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { LoginComponent } from './features/shared-components/login/login.component';
import { RegisterComponent } from './features/shared-components/register/register.component';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [LoginComponent],
  imports: [RegisterComponent, RouterOutlet, InquiryHeaderComponent, SidebarComponent, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  protected isSidebar: boolean = true;
  protected isLogin: boolean = false;
  protected isRegister:boolean = false;

  private readonly loginComponent:LoginComponent = inject(LoginComponent);

  ngOnInit(): void {
    this.loginComponent.isRewgister$.pipe(first()).subscribe((value:boolean)=> value ? this.isRegister = value:0)
  }

 
  
  protected getSidenavEvent(event: boolean) {
    if (event) {
      this.isSidebar = !this.isSidebar;
    }
  }

  protected login(event: any) {
  event ?  this.isLogin = !this.isLogin : 0;
   console.log(this.isLogin);
   
  }
}
