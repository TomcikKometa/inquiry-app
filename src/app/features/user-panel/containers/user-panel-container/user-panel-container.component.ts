import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_OPTIONS } from '../../../../@config/form-config';
import { NavigationService } from '../../../../@core/services/navigation/navigation.service';
import { AccountsKey, AccountsToken } from '../../../../@core/services/token-enums';
import { InquiryTableListUserComponent } from '../../components/inquiry-table-list-user/inquiry-table-list-user.component';
import { InquiryFormToFillComponent } from '../../components/inquiry-form-to-fill/inquiry-form-to-fill.component';


@Component({
  selector: 'inq-admin-panel-container',
  standalone: true,
  imports: [MatButtonModule, InquiryTableListUserComponent],
  templateUrl: './user-panel-container.component.html',
  styleUrl: './user-panel-container.component.css'
})
export class UserPanelContainerComponent implements OnInit {
  protected sessionStorageUser!: string;

  private readonly dialog: MatDialog = inject(MatDialog);

  public ngOnInit(): void {
    this.sessionStorageUser = window.sessionStorage.getItem(AccountsKey.TOKEN_KEY)!;
  }

  protected openInquiryFormToFill(id: Event): void {
    this.dialog.open(InquiryFormToFillComponent, { data: id, ...DIALOG_OPTIONS });
  }

  get accountsToken(): typeof AccountsToken {
    return AccountsToken;
  }
}
