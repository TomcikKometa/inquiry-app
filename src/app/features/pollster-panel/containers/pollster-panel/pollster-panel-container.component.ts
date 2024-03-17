import { Component, inject } from '@angular/core';
import { AccountsKey, AccountsToken } from '../../../../@core/services/token-enums';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DIALOG_OPTIONS } from '../../../../@config/form-config';
import { InquiryFormComponent } from '../../components/inquiry-form/inquiry-form/inquiry-form.component';
import { ToastrServiceMesseges } from '../../../../@enums/toastr-messeges';
import { InquiryTableListPollsterComponent } from '../../components/inquiry-table-list/inquiry-table-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationService } from '../../../../@core/services/navigation/navigation.service';
import { DatePipe, registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { MatCardModule } from '@angular/material/card';
import { InquirySavedInfo } from '../@models/pollster-containers-models';
registerLocaleData(localePl);

@Component({
  selector: 'inq-admin-panel-container',
  standalone: true,
  providers: [DatePipe],
  imports: [InquiryTableListPollsterComponent, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './pollster-panel-container.component.html',
  styleUrl: './pollster-panel-container.component.css'
})
export class PollsterPanelContainerComponent {
  protected sessionStorageUser!: string;
  protected userType!: string;
  protected timeActual!: string;
  protected currentDate: Date = new Date();

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly toastService: ToastrService = inject(ToastrService);
  private readonly navigationService: NavigationService = inject(NavigationService);
  private readonly datePipe: DatePipe = inject(DatePipe);

  public ngOnInit(): void {
    this.clock();
    this.sessionStorageUser = window.sessionStorage.getItem(AccountsKey.TOKEN_KEY)!;
    window.sessionStorage.getItem(AccountsKey.TOKEN_KEY)! === 'pollsterToken' ? (this.userType = 'Pollster') : (this.userType = 'User');
    setInterval(() => this.clock(), 1000);
  }

  private clock(): void {
    this.currentDate.setSeconds(this.currentDate.getSeconds() + 1);
    this.timeActual = this.datePipe.transform(this.currentDate, 'HH:mm:ss') as string;
  }

  protected openInquiryForm(id?: string) {
    const dialogRef = this.dialog.open(InquiryFormComponent, { data: id, ...DIALOG_OPTIONS });

    dialogRef.afterClosed().subscribe((inquirySavedInfo: InquirySavedInfo) => {
      const isSaved = inquirySavedInfo.isSaved;
      const inquiryName = inquirySavedInfo.inquiryName;
      if (isSaved) {
        this.toastService.success(ToastrServiceMesseges.VALID_FORM, `Inquiry: ${inquiryName}`, {
          positionClass: 'toast-top-right',
          tapToDismiss: true,
          closeButton: true
        });
      }
    });
  }

  protected logOut(): void {
    this.navigationService.navigateToLogin();
  }

  public showDeleteToastr(name: string) {
    this.toastService.error(ToastrServiceMesseges.DELETE, `Inquiry: ${name}`, {
      positionClass: 'toast-top-right',
      tapToDismiss: true,
      closeButton: true
    });
  }
  get accountsToken(): typeof AccountsToken {
    return AccountsToken;
  }
}
