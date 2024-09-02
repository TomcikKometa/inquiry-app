import { Component } from '@angular/core';

@Component({
  selector: 'inq-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  protected isUserDetail = false;

  protected showItems(details: string) {
    console.log(1);
    if (details) {
      this.isUserDetail = !this.isUserDetail;
    }
  }
}
