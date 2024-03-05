import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_OPTIONS } from '../../../../@config/form-config';
import { InquiryFormComponent } from '../../components/inquiry-form/inquiry-form/inquiry-form.component';
import { InquiryTableListComponent } from '../../components/inquiry-table-list/inquiry-table-list.component';
import { ToastrService } from 'ngx-toastr';
import { ToastrServiceMesseges } from '../../../../@enums/toastr-messeges';
import { AccountsKey, AccountsToken } from '../../../../@core/services/token-enums';

@Component({
  selector: 'inq-admin-panel-container',
  standalone: true,
  imports: [MatButtonModule, InquiryTableListComponent],
  templateUrl: './dashboard-panel-container.component.html',
  styleUrl: './dashboard-panel-container.component.css'
})
export class DashboardPanelContainerComponent implements OnInit {
  
  protected sessionStorageUser!:string;

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly toastService: ToastrService = inject(ToastrService);

  public ngOnInit(): void {
    this.sessionStorageUser = window.sessionStorage.getItem(AccountsKey.TOKEN_KEY)!;
  } 

  public openInquiryForm(id?:string) {
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
