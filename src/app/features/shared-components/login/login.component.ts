import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoginFormService } from '../services/login-form/login-form.service';
import { debounceTime,Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'inq-login',
  standalone: true,
  imports: [MatCardModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  protected _loginForm!: FormGroup;

  private readonly loginService: LoginFormService = inject(LoginFormService);
  private readonly _destroy: Subject<boolean> = new Subject<boolean>();
  private _subscription: Subscription | undefined;

  public ngOnInit(): void {
    this._loginForm = this.loginService._loginForm;
    this._subscription = this._loginForm
      .get('login')
      ?.valueChanges.pipe(takeUntil(this._destroy), debounceTime(200))
      .subscribe((value: string) => {
        if (value) {
          const valueToLowerCase = value.toLowerCase();
          this._loginForm.controls['login']?.setValue(valueToLowerCase);
        }
      });
  }

  protected signIn(): void {
    if (this._loginForm.valid) {
    } else console.log('not valid');
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
}
