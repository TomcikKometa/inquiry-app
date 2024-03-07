import { Component, inject } from '@angular/core';
import { AccountsKey, AccountsToken } from '../../../../@core/services/token-enums';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DIALOG_OPTIONS } from '../../../../@config/form-config';
import { InquiryFormComponent } from '../../components/inquiry-form/inquiry-form/inquiry-form.component';
import { ToastrServiceMesseges } from '../../../../@enums/toastr-messeges';
import { InquiryTableListPollsterComponent } from '../../components/inquiry-table-list/inquiry-table-list.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NavigationService } from '../../../../@core/services/navigation/navigation.service';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
registerLocaleData(localePl);

@Component({
  selector: 'inq-admin-panel-container',
  standalone: true,
  providers: [DatePipe
  ],
  imports: [InquiryTableListPollsterComponent, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './pollster-panel-container.component.html',
  styleUrl: './pollster-panel-container.component.css'
})
export class PollsterPanelContainerComponent {

  protected sessionStorageUser!:string;
  protected userType!:string;
  protected timeActual!:string;

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly toastService: ToastrService = inject(ToastrService);
  private readonly navigationService: NavigationService = inject(NavigationService);
  private readonly datePipe: DatePipe = inject(DatePipe);

  public ngOnInit(): void {
    this.sessionStorageUser = window.sessionStorage.getItem(AccountsKey.TOKEN_KEY)!;
    window.sessionStorage.getItem(AccountsKey.TOKEN_KEY)! === 'pollsterToken' ? (this.userType = 'Pollster') : (this.userType = 'User');
    setInterval(() => this.clock(), 1000);
  }

  clock(): string {
    const now = Date.now();
    const time: string = `${this.datePipe.transform(now,'HH:mm:ss')}`;
    this.timeActual = time;
    return time;
  }

  protected openInquiryForm(id?:string) {
    const dialogRef = this.dialog.open(InquiryFormComponent, {data:id, ...DIALOG_OPTIONS});

    dialogRef.afterClosed().subscribe((isInquirySaved:boolean) => {
      if (isInquirySaved) {
        this.toastService.success(ToastrServiceMesseges.VALID_FORM, '', {
          positionClass: 'toast-top-right',
          tapToDismiss: true,
          closeButton: true
        })
      }
    });
  }

  protected logOut():void{
    this.navigationService.navigateToLogin();
  }
  get accountsToken(): typeof AccountsToken{
    return AccountsToken;
  }

}
