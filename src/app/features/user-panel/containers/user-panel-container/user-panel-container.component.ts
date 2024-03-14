import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_OPTIONS } from '../../../../@config/form-config';
import { NavigationService } from '../../../../@core/services/navigation/navigation.service';
import { AccountsKey, AccountsToken } from '../../../../@core/services/token-enums';
import { InquiryTableListUserComponent } from '../../components/inquiry-table-list-user/inquiry-table-list-user.component';
import { InquiryFormToFillComponent } from '../../components/inquiry-form-to-fill/inquiry-form-to-fill.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { InquiryFormComponent } from '../../../pollster-panel/components/inquiry-form/inquiry-form/inquiry-form.component';

export interface TimeClock {
  hours: string;
  muntes: string;
  seconds: string;
}

@Component({
  selector: 'inq-admin-panel-container',
  standalone: true,
  providers:[DatePipe],
  imports: [MatButtonModule, InquiryTableListUserComponent, MatIconModule, MatCardModule],
  templateUrl: './user-panel-container.component.html',
  styleUrl: './user-panel-container.component.css'
})
export class UserPanelContainerComponent implements OnInit {
  protected sessionStorageUser!: string;
  protected userType!: string;
  protected timeActual!: string;
  protected currentDate: Date = new Date();

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly navigationService: NavigationService = inject(NavigationService);
  private readonly datePipe: DatePipe = inject(DatePipe);

  public ngOnInit(): void {
    this.clock();
    setInterval(() => this.clock(), 1000);
    this.sessionStorageUser = window.sessionStorage.getItem(AccountsKey.TOKEN_KEY)!;
    window.sessionStorage.getItem(AccountsKey.TOKEN_KEY)! === 'pollsterToken' ? (this.userType = 'Pollster') : (this.userType = 'User');
  }

  private clock(): void {
    this.currentDate.setSeconds(this.currentDate.getSeconds() + 1);
    this.timeActual = this.datePipe.transform(this.currentDate,'HH:mm:ss') as string;
  }

  protected openInquiryFormToFill(id: string): void {
    this.dialog.open(InquiryFormToFillComponent, {data:id, ...DIALOG_OPTIONS});
  }

  protected logOut(): void {
    this.navigationService.navigateToLogin();
  }

  get accountsToken(): typeof AccountsToken {
    return AccountsToken;
  }
}
