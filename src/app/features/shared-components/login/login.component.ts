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

  private readonly loginService: LoginFormService = inject(LoginFormService);

  public ngOnInit(): void {
    this._loginForm = this.loginService._loginForm;
  }

  protected signIn():void{
    if(this._loginForm.valid){
    }
  }

  protected get loginForm(): FormGroup {
    return this._loginForm;
  }
}
