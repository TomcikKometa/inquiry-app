import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'inq-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  protected isComponentUser = false;
  protected isInquiryDetail = false;
  protected isComponentUserHoover = false;
  protected isComponentInquiryHoover = false;
  componentUserId: number = 0;
  componentInquiryId:number = 0;

  userDatailList = [
    { id: 1, text: 'Profile' },
    { id: 2, text: 'Settings' }
  ];

  inquiryDetailList = [
    { id: 1, text: 'To fill' },
    { id: 2, text: 'Done' },
    { id: 3, text: 'Scores' }
  ];

  protected showComponent(mainDetails: string, rowDetails?: string) {
    if (mainDetails === 'userDetail') {
      this.isComponentInquiryHoover = false;
      this.isComponentUser = !this.isComponentUser;
      this.isComponentUser == false ? (this.componentUserId = 0) : 0;
      this.isComponentUserHoover = true;
    }

    if (mainDetails === 'inquiryDetail') {
      this.isComponentUserHoover = false;
      this.componentUserId = 0;
      this.isInquiryDetail = !this.isInquiryDetail;
      this.isComponentInquiryHoover = true;
    }
  }

  setHoover(componentRow:string,id: number) {
    if(componentRow === 'inquiry'){
      this.componentInquiryId = id;
      this.componentUserId = 0;
      this.isComponentInquiryHoover = true;
      this.isComponentUserHoover = false;
    }
    if(componentRow === 'user'){
      this.componentUserId = id;
      this.componentInquiryId = 0;
      this.isComponentInquiryHoover = false;
      this.isComponentUserHoover = true;
    }
  }
}
