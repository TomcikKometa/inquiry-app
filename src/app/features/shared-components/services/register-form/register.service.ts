import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, Observable, Subject, Subscription, takeUntil } from 'rxjs';
export enum RegisterFormName {
  USERNAME = 'userName',
  EMAIL = 'email',
  PASSWORD = 'password',
  PASSWORD_CONFIRMED = 'passwordConfirmed',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName'
}
@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {
  public _registerForm!: FormGroup;
  public get isPasswordValid$(): Observable<boolean> {
    return this.isPassowrdValid.asObservable();
  }
  private static readonly EMAIL_PATTERN: RegExp = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$');
  private maxPasswordLength: number = 20;
  private minPasswordLength: number = 8;
  private maxLoginLength: number = 25;
  private minLoginLength: number = 4;
  private nameLength: number = 30;
  private readonly _destroy: Subject<boolean> = new Subject<boolean>();
  private isPassowrdValid: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly formBuilder: NonNullableFormBuilder) {
    this._registerForm = this.createForm();
    this.setWarnings();
  }

  setWarnings(): void {
    this._registerForm
      .get(RegisterFormName.PASSWORD)
      ?.valueChanges.pipe(takeUntil(this._destroy), debounceTime(1500))
      .subscribe(() => {
        if (this._registerForm.controls[RegisterFormName.PASSWORD]?.invalid || this._registerForm.controls['password'].updateOn) {
          this.isPassowrdValid.next(true);
        } else this.isPassowrdValid.next(false);

        setTimeout(() => {
          this.isPassowrdValid.next(false)
        },4500)
      });

      
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      [RegisterFormName.USERNAME]: this.formBuilder.control<string>('', { validators: this.validateLogin() }),
      [RegisterFormName.EMAIL]: this.formBuilder.control<string>('', { validators: Validators.pattern(RegisterFormService.EMAIL_PATTERN) }),
      [RegisterFormName.PASSWORD]: this.formBuilder.control<string>('', { validators: this.validatePassword() }),
      [RegisterFormName.PASSWORD_CONFIRMED]: this.formBuilder.control<string>('', { validators: this.validConfirmedPassword() }),
      [RegisterFormName.FIRST_NAME]: this.formBuilder.control<string>('', { validators: this.validateFirstLastName() }),
      [RegisterFormName.LAST_NAME]: this.formBuilder.control<string>('', { validators: this.validateFirstLastName() })
    });
  }

  private validatePassword(): ValidatorFn {
    return (control: AbstractControl) => {
      const passwordControl: FormControl = control as FormControl;

      const regexSpecialSigns = /[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/].{0,20}$/.test(passwordControl.value);
      const regexLowerLetters = /[a-z].{0,20}$/.test(passwordControl.value);
      const regexCapitalLetters = /[A-Z].{0,20}$/.test(passwordControl.value);
      const regexNumbers = /[0-9].{0,20}$/.test(passwordControl.value);
      const noBlankSpace = /^$|[\s]/.test(passwordControl.value);

      if (passwordControl.value.length <= this.minPasswordLength || passwordControl.value.length > this.maxPasswordLength) {
        return { error: 'Error password length' };
      }
      if (!regexLowerLetters) {
        return { error: 'Error password length' };
      }
      if (!regexNumbers) {
        return { error: 'Error password length' };
      }
      if (!regexSpecialSigns) {
        return { error: 'Error password length' };
      }
      if (!regexCapitalLetters) {
        return { error: 'Error password length' };
      }
      if (noBlankSpace) {
        return { error: 'Error password length' };
      }
      return null;
    };
  }

  private validateLogin(): ValidatorFn {
    return (control: AbstractControl) => {
      const loginControl: FormControl<string> = control as FormControl;

      const regexSpecialSigns = /[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/]|[\s]/.test(loginControl.value);
      const firstFiveCharacters = loginControl.value.slice(0, 3);
      const regexNoFirstNumbers = /^[a-zA-Z]{0,3}$|[\s]/.test(firstFiveCharacters);

      if (loginControl.value.length < this.minLoginLength || loginControl.value.length > this.maxLoginLength) {
        return { error: 'Error login lentgh' };
      }
      if (!regexNoFirstNumbers) {
        return { error: 'Error login lentgh' };
      }
      if (regexSpecialSigns) {
        return { error: 'Error login lentgh' };
      }
      return null;
    };
  }

  private validateFirstLastName() {
    return (control: AbstractControl) => {
      const name: FormControl<string> = control as FormControl;

      if (name.value.length > this.nameLength) {
        return { error: 'Error login lentgh' };
      }
      return null;
    };
  }

  private validConfirmedPassword() {
    return (control: AbstractControl) => {
      const passwordConfirmed: FormControl<string> = control as FormControl;
      const password = this._registerForm?.controls['password'] as FormControl;

      if (!passwordConfirmed.value) {
        return { error: 'Error login lentgh' };
      }
      if (!(password?.value == passwordConfirmed.value)) {
        return { error: 'Error login lentgh' };
      }
      return null;
    };
  }
}
