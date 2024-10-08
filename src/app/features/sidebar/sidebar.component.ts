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
  protected componentId: number = 0;

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
  private readonly inquiryApiService: InquiryApiService = inject(InquiryApiService);

  protected showComponent(mainDetails: string) {
    this.componentId = 0;
    if (mainDetails === 'isInquiryDetail') {
      this.isInquiryDetail = !this.isInquiryDetail;
      this.isTableDetail = false;
      this.isChartsDetail = false;
    }

    if (mainDetails === 'isTableDetail') {
      this.isTableDetail = !this.isTableDetail;
      this.isInquiryDetail = false;
      this.isChartsDetail = false;
    }

    if (mainDetails === 'isChartsDetail') {
      this.isChartsDetail = !this.isChartsDetail;
      this.isInquiryDetail = false;
      this.isTableDetail = false;
    }

    if (mainDetails === 'userDetail') {
      this.isComponentUser = !this.isComponentUser;
      this.isInquiryDetail = false;
      this.isTableDetail = false;
      this.isChartsDetail = false;
    }
  }

  protected setDetail(componentRow: string, id: number, action?: string) {
    this.componentId = id;
    if (componentRow === 'isInquiryDetail') {
      action == 'create' ? this.openCreateInquiryForm() : 0;
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
