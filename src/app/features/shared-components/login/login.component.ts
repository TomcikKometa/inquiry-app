import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../../../@core/services/store/store.service';
import { AccountsKey, AccountsToken } from '../../../@core/services/token-enums';
import { MatButtonModule } from '@angular/material/button';
import { NavigationService } from '../../../@core/services/navigation/navigation.service';
import { LoginFormService } from '../services/login-form/login-form.service';
import { debounceTime, first, fromEvent, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'inq-login',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  choosedAccount!: string;
  protected _loginForm!: FormGroup;

  private readonly loginService: LoginFormService = inject(LoginFormService);
  private readonly _destroy: Subject<boolean> = new Subject<boolean>();
  private _subscription: Subscription | undefined;

  public ngOnInit(): void {
    this._loginForm = this.loginService._loginForm;

    this._subscription = this._loginForm.get('login')?.valueChanges.pipe(
      takeUntil(this._destroy),debounceTime(200)).subscribe((value: string) => {
        if (value) {
          const valueToLowerCase = value.toLowerCase();
          this._loginForm.controls['login']?.setValue(valueToLowerCase);
        }
        console.log(value);
      });
  }

  protected signIn(): void {
    console.log(this._loginForm);

    if (this._loginForm.valid) {
      console.log('valid');
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

  public unsubscribe(): void {
    this._destroy.next(true);
    this._destroy.unsubscribe();
  }
}
