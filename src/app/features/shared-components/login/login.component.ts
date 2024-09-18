import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoginFormService } from '../services/login-form/login-form.service';
import { debounceTime, Subject, Subscription, takeUntil } from 'rxjs';
import { UserApiService } from '../../../@api/services/user-service/user-api.service';
import { UserLoginResponse } from '../../../@api/services/user-service/models/user-login-response';
import { StoreService } from '../../../@core/services/store/store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationService } from '../../../@core/services/navigation/navigation.service';

@Component({
  selector: 'inq-login',
  standalone: true,
  imports: [MatCardModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  protected _loginForm!: FormGroup;
  protected _showLoginError:boolean = false;

  private readonly navigationService:NavigationService  = inject(NavigationService);
  private readonly loginFormService: LoginFormService = inject(LoginFormService);
  private readonly _destroy: Subject<boolean> = new Subject<boolean>();
  private readonly userApiService: UserApiService = inject(UserApiService);
  private _subscription: Subscription | undefined;
  private readonly storeService: StoreService = inject(StoreService);

  public ngOnInit(): void {
    this._loginForm = this.loginFormService._loginForm;
    this._subscription = this._loginForm
      .get('login')
      ?.valueChanges.pipe(takeUntil(this._destroy), debounceTime(200))
      .subscribe((value: string) => {
        if (value) {
          const valueToLowerCase = value.toLowerCase();
          // this._loginForm.controls['login']?.setValue(valueToLowerCase);
        }
      });
  }

  protected signIn(): void {
    this.userApiService.login(this._loginForm).subscribe({
      next: (response: UserLoginResponse) => {
        this.navigationService.navigateToPollsterMainDashboard();
        this.storeService.saveUserToken(response.token);
      },
      error:(error:HttpErrorResponse) =>{
        if(error.status === 403 || error.status === 401){
          this._showLoginError = true;
          setTimeout(() => {this._showLoginError = false},7000)
        }
      }
    });
  }

  protected get loginForm(): FormGroup {
    return this._loginForm;
  }

  private get incomeNetFormControl(): FormControl {
    return this._loginForm.get('login') as FormControl;
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  protected navigateToRegister(): void {
    this.navigationService.navitatoToRegisterComponent();
  }
}
