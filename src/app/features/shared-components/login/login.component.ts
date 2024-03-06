import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../../@core/services/store/store.service';
import { AccountsKey, AccountsToken } from '../../../@core/services/token-enums';
import { MatButtonModule } from '@angular/material/button';
import { NavigationService } from '../../../@core/services/navigation/navigation.service';

@Component({
  selector: 'inq-login',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, MatSelectModule, FormsModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  choosedAccount!: string;

  private readonly storeService: StoreService = inject(StoreService)
  private readonly navigationService: NavigationService = inject(NavigationService);


  loginOptions = [
    { value: '0', viewValue: 'Pollster', id: 1 },
    { value: '1', viewValue: 'User', id: 2 }
  ];
  loginOption: any;

  protected chooseUserAccount(): void {
    if (this.choosedAccount === '0') {
      const adminToken = AccountsToken.POLLSTER_TOKEN;
      this.storeService.saveUserToken(adminToken)
    }
    if (this.choosedAccount === '1') {
      const userToken = AccountsToken.USER_TOKEN;
      this.storeService.saveUserToken(userToken)
    }
  }

  protected logIn(): void{
    const sessionStorageUserType: string = window.sessionStorage.getItem(AccountsKey.TOKEN_KEY)!;
    if (sessionStorageUserType === AccountsToken.POLLSTER_TOKEN) {
      this.navigationService.navigateToTableListPollster();
    }
    if (sessionStorageUserType === AccountsToken.USER_TOKEN) {
      this.navigationService.navigateToTableListUser();
    } 
  }
}
