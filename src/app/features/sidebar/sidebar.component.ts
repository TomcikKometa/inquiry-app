import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { first } from 'rxjs';
import { DIALOG_OPTIONS_FORM } from '../../config/form-config';
import { Inquiry } from '../../models/inquiry';
import { InquiryFormComponent } from '../pollster-panel/components/inquiry-form/inquiry-form/inquiry-form.component';
import { MatDialog } from '@angular/material/dialog';
import { InquiryApiService } from '../../api/services/inquiry-service/inquiry-api.service';
import { NavigationService } from '../../core/services/navigation/navigation.service';
import { StoreService } from '../../core/services/store/store.service';

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
    { id: 1, text: 'Edit', action: 'edit' },
    { id: 2, text: 'Approved -TODO', action: 'approved' },
    { id: 3, text: 'On production -TODO', action: 'production' }
  ];

  protected chartsList = [
    { id: 1, text: 'Done - TODO' },
    { id: 2, text: 'Scores - TODO' }
  ];

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly inquiryApiService: InquiryApiService = inject(InquiryApiService);
  private readonly navigationService: NavigationService = inject(NavigationService);
  private readonly storeService:StoreService = inject(StoreService);

  protected showComponent(mainDetails: string) {
    this.componentId = 0;
    if (mainDetails === 'isInquiryDetail') {
      this.isInquiryDetail = !this.isInquiryDetail;
      this.isTableDetail = false;
      this.isChartsDetail = false;
      this.isComponentUser = false;
    }

    if (mainDetails === 'isTableDetail') {
      this.isTableDetail = !this.isTableDetail;
      this.isInquiryDetail = false;
      this.isChartsDetail = false;
      this.isComponentUser = false;
    }

    if (mainDetails === 'isChartsDetail') {
      this.isChartsDetail = !this.isChartsDetail;
      this.isInquiryDetail = false;
      this.isTableDetail = false;
      this.isComponentUser = false;
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

  protected navigateTo(action: string): void {
    action == 'edit' ? (this.navigationService.navigateToInquiryTableEdit(),this.storeService.setCenterView(true)): 0;
  }
}
