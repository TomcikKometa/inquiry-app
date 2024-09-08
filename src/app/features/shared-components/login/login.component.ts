import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../../../@core/services/store/store.service';
import { AccountsKey, AccountsToken } from '../../../@core/services/token-enums';
import { MatButtonModule } from '@angular/material/button';
import { NavigationService } from '../../../@core/services/navigation/navigation.service';
import { LoginFormService } from '../services/login-form/login-form.service';

@Component({
  selector: 'inq-login',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, MatSelectModule, FormsModule, MatButtonModule,ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  choosedAccount!: string;
  protected _loginForm!: FormGroup;

  loginOptions = [
    { value: '0', viewValue: 'Pollster', id: 1 },
    { value: '1', viewValue: 'User', id: 2 }
  ];

  private readonly storeService: StoreService = inject(StoreService);
  private readonly navigationService: NavigationService = inject(NavigationService);
  private readonly loginService: LoginFormService = inject(LoginFormService);

  public ngOnInit(): void {
    this._loginForm = this.loginService._loginForm;

    console.log(this._loginForm);
    
  }

  protected chooseUserAccount(): void {
    if (this.choosedAccount === '0') {
      const adminToken = AccountsToken.POLLSTER_TOKEN;
      this.storeService.saveUserToken(adminToken);
    }
    if (this.choosedAccount === '1') {
      const userToken = AccountsToken.USER_TOKEN;
      this.storeService.saveUserToken(userToken);
    }
  }

  protected logIn(): void {
    const sessionStorageUserType: string = window.sessionStorage.getItem(AccountsKey.TOKEN_KEY)!;
    if (sessionStorageUserType === AccountsToken.POLLSTER_TOKEN) {
      this.navigationService.navigateToTableListPollster();
    }
    if (sessionStorageUserType === AccountsToken.USER_TOKEN) {
      this.navigationService.navigateToTableListUser();
    }
  }

  protected signIn():void{
    if(this._loginForm.valid){
      console.log('valid');
      
    } else console.log('not valid');
    
  }

  protected get loginForm(): FormGroup {
    return this._loginForm;
  }
}
