import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { first } from 'rxjs';
import { DIALOG_OPTIONS_FORM } from '../../config/form-config';
import { Inquiry } from '../../models/inquiry';
import { InquiryFormComponent } from '../pollster-panel/components/inquiry-form/inquiry-form/inquiry-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InquiryApiService } from '../../api/services/inquiry-service/inquiry-api.service';
import { NavigationService } from '../../core/services/navigation/navigation.service';

@Component({
  selector: 'inq-sidebar',
  standalone: true,
  providers:[InquiryApiService],
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
  protected componentInquiryId: number = 0;
  protected componentTableId: number = 0;

  protected userDatailList = [
    { id: 1, text: 'Profile' },
    { id: 2, text: 'Settings' }
  ];

  protected inquiryDetailList = [
    { id: 1, text: 'Create inquiry', action: 'create' },
    { id: 2, text: 'Edit inquiry', action: 'edit' },
    { id: 3, text: 'Fill inquiry', action: 'fill' },
    { id: 4, text: 'Approve inquiry', action: 'approve' }
  ];

  protected tablesList = [
    { id: 1, text: 'To fill' },
    { id: 2, text: 'Done' }
  ];

  protected chartsList = [
    { id: 1, text: 'Done' },
    { id: 2, text: 'Scores' }
  ];

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly toastService: ToastrService = inject(ToastrService);
  private readonly navigationService: NavigationService = inject(NavigationService);
  private readonly inquiryApiService: InquiryApiService = inject(InquiryApiService);

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

  setDetail(componentRow: string, id: number,action?:string) {
    if (componentRow === 'inquiry') {
      this.componentInquiryId = id;
      this.componentUserId = 0;
      this.isComponentInquiryHoover = true;
      this.isComponentUserHoover = false;
      this.isComponentTableHoover = false;
      action == 'create' ? this.openCreateInquiryForm() : 0; 
    }
    if (componentRow === 'user') {
      this.componentUserId = id;
      this.componentInquiryId = 0;
      this.isComponentInquiryHoover = false;
      this.isComponentUserHoover = true;
      this.isComponentTableHoover = false;
    }

    if (componentRow === 'table') {
      this.componentUserId = 0;
      this.componentInquiryId = 0;
      this.componentTableId = id;
      this.isComponentTableHoover = true;
      this.isComponentInquiryHoover = false;
      this.isComponentUserHoover = false;
    }
  }

  protected openCreateInquiryForm(): void{
    const dialogRef = this.dialog.open(InquiryFormComponent, { ...DIALOG_OPTIONS_FORM });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((inquiry: Inquiry) => {
        if (inquiry) {
          this.inquiryApiService.createInquiry(inquiry);
        }
      });
  }
}
