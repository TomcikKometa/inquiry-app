import { Component, LOCALE_ID, OnInit, Pipe, inject } from '@angular/core';
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

export interface TimeClock {
  hours: string;
  muntes: string;
  seconds: string;
}


@Component({
  selector: 'inq-admin-panel-container',
  standalone: true,
  providers: [DatePipe
  ],
  imports: [MatButtonModule, InquiryTableListUserComponent, MatIconModule, MatCardModule],
  templateUrl: './user-panel-container.component.html',
  styleUrl: './user-panel-container.component.css'
})


export class UserPanelContainerComponent implements OnInit {

  @Pipe({
    name: 'dateFormat'
})
  protected sessionStorageUser!: string;
  protected userType!: string;
  protected timeActual!: string;

  hours!: number;
  minutes!: number;
  seconds!: number;

  private readonly dialog: MatDialog = inject(MatDialog);
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

  protected openInquiryFormToFill(id: Event): void {
    this.dialog.open(InquiryFormToFillComponent, { data: id, ...DIALOG_OPTIONS });
  }

  protected logOut(): void {
    this.navigationService.navigateToLogin();
  }

  get accountsToken(): typeof AccountsToken {
    return AccountsToken;
  }
}
