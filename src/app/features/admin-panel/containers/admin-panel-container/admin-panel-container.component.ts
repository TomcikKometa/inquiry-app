import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_OPTIONS } from '../../../../@config/form-config';
import { InquiryFormComponent } from '../../components/inquiry-form/inquiry-form/inquiry-form.component';
import { InquiryTableListComponent } from '../../components/inquiry-table-list/inquiry-table-list.component';
import { ToastrService } from 'ngx-toastr';
import { ToastrServiceMesseges } from '../../../../@enums/toastr-messeges';

@Component({
  selector: 'inq-admin-panel-container',
  standalone: true,
  imports: [MatButtonModule, InquiryTableListComponent],
  templateUrl: './admin-panel-container.component.html',
  styleUrl: './admin-panel-container.component.css'
})
export class AdminPanelContainerComponent {
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly toastService: ToastrService = inject(ToastrService);

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
}
