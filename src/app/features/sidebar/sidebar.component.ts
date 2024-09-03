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
  protected isUserDetail = false;
  protected isUserDetailRow = false;
  protected isInquiryDetail = false;
  protected isInquiryDetailRow = false;
  protected isComponentUserHoover = false;
  protected isComponentInquiryHoover = false;
  idFor: number = 0;

  userDatailList = [
    { id: 1, text: 'bla bla' },
    { id: 2, text: 'la la la' }
  ];

  inquiryDetailList = [
    { id: 1, text: 'To fill' },
    { id: 2, text: 'Done' },
    { id: 3, text: 'Scores' }
  ];

  protected showItems(mainDetails: string, rowDetails?: string) {
    console.log(mainDetails);
    if (mainDetails === 'userDetail') {
      this.isComponentInquiryHoover = false;
      this.isUserDetail = !this.isUserDetail;
      this.isUserDetail == false ? (this.idFor = 0) : 0;
      this.isComponentUserHoover = true;
    }

    if (mainDetails === 'inquiryDetail') {
      this.idFor = 0;
      this.isComponentUserHoover = false;
      this.isInquiryDetail = !this.isInquiryDetail;
      this.isComponentInquiryHoover = true;
      this.isUserDetail == false ? (this.idFor = 0) : 0;
    }
  }

  id(id: number) {
    this.idFor = id;
  }
}
