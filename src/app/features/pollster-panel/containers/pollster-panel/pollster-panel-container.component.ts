import { Component, inject } from '@angular/core';
import { AccountsKey, AccountsToken } from '../../../../@core/services/token-enums';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DIALOG_OPTIONS } from '../../../../@config/form-config';
import { InquiryFormComponent } from '../../components/inquiry-form/inquiry-form/inquiry-form.component';
import { ToastrServiceMesseges } from '../../../../@enums/toastr-messeges';
import { InquiryTableListPollsterComponent } from '../../components/inquiry-table-list/inquiry-table-list.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'inq-admin-panel-container',
  standalone: true,
  imports: [InquiryTableListPollsterComponent, MatButtonModule],
  templateUrl: './pollster-panel-container.component.html',
  styleUrl: './pollster-panel-container.component.css'
})
export class PollsterPanelContainerComponent {

  protected sessionStorageUser!:string;

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly toastService: ToastrService = inject(ToastrService);

  public ngOnInit(): void {
    this.sessionStorageUser = window.sessionStorage.getItem(AccountsKey.TOKEN_KEY)!;
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

  get accountsToken(): typeof AccountsToken{
    return AccountsToken;
  }

}
