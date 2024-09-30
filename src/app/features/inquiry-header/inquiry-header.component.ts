import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';

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
  opened: boolean = false;

  private readonly router:Router = inject(Router);

  protected login():void{
    this.isLogin.next(true);
    this.router.navigate(['login'])
  }
}
