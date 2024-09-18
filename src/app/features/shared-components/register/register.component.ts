import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RegisterFormName, RegisterFormService } from '../services/register-form/register.service';
import { debounceTime, first, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../@core/services/navigation/navigation.service';
import { UserApiService } from '../../../@api/services/user-service/user-api.service';
import { UserLoginResponse } from '../../../@api/services/user-service/models/user-login-response';
import { StoreService } from '../../../@core/services/store/store.service';
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'inq-register',
  standalone: true,
  imports: [MatCardModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  protected _registerForm!: FormGroup;

  protected isPasswordValid: boolean = false;
  protected _showRegisterError:boolean = false;

  private readonly navigationService: NavigationService = inject(NavigationService);
  private readonly registerFormService: RegisterFormService = inject(RegisterFormService);
  private readonly userApiService: UserApiService = inject(UserApiService);
  private readonly storeService: StoreService = inject(StoreService);

  public ngOnInit(): void {
    this.registerFormService.isPasswordValid$.subscribe((x: boolean) => (this.isPasswordValid = x));
    this._registerForm = this.registerFormService._registerForm;
  }

  protected register(): void {
    if (this.registerForm.valid) {
      this.userApiService
        .registerUser(this.registerForm)
        .pipe(first())
        .subscribe({
          next: (response) => {
            // this.navigationService.navigateToPollsterMainDashboard();
            // this.storeService.saveUserToken(response.token);
            console.log(response);
            
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 403 || error.status === 401) {
              this._showRegisterError = true;
              setTimeout(() => {
                this._showRegisterError = false;
              }, 7000);
            }
          }
        });
    }
  }

  protected navigateToLogin() {
    this.navigationService.navigateToLogin();
  }

  protected get registerForm(): FormGroup {
    return this._registerForm;
  }

  protected get registerFormName(): typeof RegisterFormName {
    return RegisterFormName;
  }
}
