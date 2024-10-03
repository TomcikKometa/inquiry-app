import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RegisterFormName, RegisterFormService } from '../services/register-form/register.service';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { UserApiService } from '../../../api/services/user-service/user-api.service';
import { NavigationService } from '../../../core/services/navigation/navigation.service';
import { StoreService } from '../../../core/services/store/store.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MAT_TABS_CONFIG } from '@angular/material/tabs';
import { RegisterCompletedComponent } from './register-completed/register-completed.component';


@Component({
  selector: 'inq-register',
  standalone: true,
  providers:[{ provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } }],
  imports: [MatCardModule, FormsModule, ReactiveFormsModule, CommonModule,RegisterCompletedComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: '1' })),
      state('out', style({ opacity: '0' })),
      transition('* => *', [animate(2500)])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  protected _registerForm!: FormGroup;

  protected isPasswordValid: boolean = false;
  protected _showRegisterError: boolean = false;
  protected isRegistred:boolean = false;
  protected animationState:string = 'out';

  private readonly navigationService: NavigationService = inject(NavigationService);
  private readonly registerFormService: RegisterFormService = inject(RegisterFormService);
  private readonly userApiService: UserApiService = inject(UserApiService);

  public ngOnInit(): void {
    this.animationState = 'out';
    this.registerFormService.isPasswordValid$.subscribe((x: boolean) => (this.isPasswordValid = x));
    this._registerForm = this.registerFormService._registerForm;
  }

  protected register(): void {
    if (this.registerForm.valid) {
      this.userApiService
        .registerUser(this.registerForm)
        .pipe(first())
        .subscribe({
          next: () => {
            this.animationState = 'out'
            this.isRegistred = true;
            setTimeout(() => {
              (this.animationState = 'in')
            }, 100);
            
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

  setIsRegistred(){
    this.isRegistred = !this.isRegistred
  }

  protected get registerForm(): FormGroup {
    return this._registerForm;
  }

  protected get registerFormName(): typeof RegisterFormName {
    return RegisterFormName;
  }
}
