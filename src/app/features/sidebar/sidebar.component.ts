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
  providers: [InquiryApiService],
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  protected isComponentUser = false;
  protected isInquiryDetail = false;
  protected isTableDetail = false;
  protected isChartsDetail = false;
  protected isComponentUserHoover = false;
  protected isComponentInquiryHoover = false;
  protected isComponentTableHoover = false;
  protected isComponentChartsHover = false;
  protected componentUserId: number = 0;
  protected componentInquiryId: number = 0;
  protected componentTableId: number = 0;
  protected componentChartsId: number = 0;

  protected userDatailList = [
    { id: 1, text: 'Profile - TODO' },
    { id: 2, text: 'Settings - TODO' }
  ];

  protected inquiryDetailList = [
    { id: 1, text: 'Create inquiry', action: 'create' },
    { id: 2, text: 'Edit inquiry - TODO', action: 'edit' },
    { id: 3, text: 'Fill inquiry  - TODO', action: 'fill' },
    { id: 4, text: 'Approve inquiry - TODO', action: 'approve' }
  ];

  protected tablesList = [
    { id: 1, text: 'To fill - TODO' },
    { id: 2, text: 'Done -TODO' }
  ];

  protected chartsList = [
    { id: 1, text: 'Done - TODO' },
    { id: 2, text: 'Scores - TODO' }
  ];

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly toastService: ToastrService = inject(ToastrService);
  private readonly navigationService: NavigationService = inject(NavigationService);
  private readonly inquiryApiService: InquiryApiService = inject(InquiryApiService);

  protected showComponent(mainDetails: string, rowDetails?: string) {
    if (mainDetails === 'isInquiryDetail') {
      this.isInquiryDetail = !this.isInquiryDetail;
      this.isComponentTableHoover = false;
      this.isComponentUserHoover = false;
      this.isComponentChartsHover = false;
      this.isComponentInquiryHoover = true;
      this.componentUserId = 0;
      this.componentTableId = 0;
      this.componentChartsId = 0;
    }

    if (mainDetails === 'isTableDetail') {
      this.isTableDetail = !this.isTableDetail;
      this.isComponentUserHoover = false;
      this.isComponentInquiryHoover = false;
      this.isComponentTableHoover = true;
      this.componentUserId = 0;
      this.componentInquiryId = 0;
      this.componentChartsId = 0;
    }
    if (mainDetails === 'isChartsDetail') {
      this.isChartsDetail = !this.isChartsDetail;
      this.isComponentUserHoover = false;
      this.isComponentInquiryHoover = false;
      this.isComponentTableHoover = false;
      this.isComponentChartsHover = true;
      this.componentUserId = 0;
      this.componentInquiryId = 0;
      this.componentTableId = 0;
    }

    if (mainDetails === 'userDetail') {
      this.isComponentUser = !this.isComponentUser;
      this.isComponentTableHoover = false;
      this.isComponentInquiryHoover = false;
      this.isComponentChartsHover = false;
      this.isComponentUserHoover = true;
      this.componentUserId = 0;
      this.componentChartsId = 0;
    }
  }

  setDetail(componentRow: string, id: number, action?: string) {
    if (componentRow === 'inquiry') {
      this.componentInquiryId = id;
      this.componentUserId = 0;
      this.componentChartsId = 0;
      this.isComponentUserHoover = false;
      this.isComponentTableHoover = false;
      this.isComponentChartsHover = false;
      this.isComponentInquiryHoover = true;
      action == 'create' ? this.openCreateInquiryForm() : 0;
    }
    if (componentRow === 'user') {
      this.componentUserId = id;
      this.componentInquiryId = 0;
      this.componentChartsId = 0;
      this.isComponentInquiryHoover = false;
      this.isComponentUserHoover = true;
      this.isComponentTableHoover = false;
    }

    if (componentRow === 'table') {
      this.componentUserId = 0;
      this.componentInquiryId = 0;
      this.componentChartsId = 0;
      this.componentTableId = id;
      this.isComponentTableHoover = true;
      this.isComponentInquiryHoover = false;
      this.isComponentUserHoover = false;
    }
    if (componentRow === 'charts') {
      this.componentInquiryId = 0;
      this.componentUserId = 0;
      this.componentChartsId = id;
      this.isComponentUserHoover = false;
      this.isComponentTableHoover = false;
      this.isComponentInquiryHoover = false;
      this.isComponentChartsHover = true;
    }
  }

  protected openCreateInquiryForm(): void {
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
