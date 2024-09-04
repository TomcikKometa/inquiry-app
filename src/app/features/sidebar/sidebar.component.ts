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
  protected isTableDetail = false;
  protected isComponentUserHoover = false;
  protected isComponentInquiryHoover = false;
  protected isComponentTableHoover = false;
  protected componentUserId: number = 0;
  protected componentInquiryId:number = 0;
  protected componentTableId:number = 0;

  protected userDatailList = [
    { id: 1, text: 'Profile' },
    { id: 2, text: 'Settings' }
  ];

  protected inquiryDetailList = [
    { id: 1, text: 'To fill' },
    { id: 2, text: 'Done' }
  ];

  protected tablesList = [
    {id:1,text:'To fill'},
    {id:2,text:'Done'}
  ]

  protected chartsList = [
    {id:1,text:'Done'},
    {id:2,text:'Scores'}
  ]



  protected showComponent(mainDetails: string, rowDetails?: string) {
    if (mainDetails === 'userDetail') {
      this.componentUserId = 0;
      this.isComponentUser = !this.isComponentUser;
      this.isComponentUserHoover = true;
      this.isComponentTableHoover = false;
      this.isComponentInquiryHoover = false;

    }

    if (mainDetails === 'inquiryDetail') {
      this.isComponentUserHoover = false;
      this.componentUserId = 0;
      this.isInquiryDetail = !this.isInquiryDetail;
      this.isComponentInquiryHoover = true;
      this.componentInquiryId = 0;
      this.isComponentTableHoover = false;
    }

    if (mainDetails === 'tableDetail') {
      this.isComponentUserHoover = false;
      this.isComponentInquiryHoover = false;
      this.isComponentTableHoover = true;
      this.componentUserId = 0;
      this.componentInquiryId = 0;
      this.componentTableId = 0;
      this.isTableDetail = !this.isTableDetail;
      
    }
  }

  setHoover(componentRow:string,id: number) {
    if(componentRow === 'inquiry'){
      this.componentInquiryId = id;
      this.componentUserId = 0;
      this.isComponentInquiryHoover = true;
      this.isComponentUserHoover = false;
      this.isComponentTableHoover = false;
    }
    if(componentRow === 'user'){
      this.componentUserId = id;
      this.componentInquiryId = 0;
      this.isComponentInquiryHoover = false;
      this.isComponentUserHoover = true;
      this.isComponentTableHoover = false;
    }

    if(componentRow === 'table'){
      this.componentUserId = 0;
      this.componentInquiryId = 0;
      this.componentTableId = id;
      this.isComponentTableHoover = true;
      this.isComponentInquiryHoover = false;
      this.isComponentUserHoover = false;
    }
  }
}
