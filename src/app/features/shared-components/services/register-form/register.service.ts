import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
export enum RegisterFormName {
  USERNAME = 'userName',
  EMAIL = 'email',
  PASSWORD = 'password',
  PASSWORD_CONFIRMED = 'passwordConfirmed',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
}

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {
  public _registerForm!:FormGroup;

  private static readonly EMAIL_PATTERN : RegExp = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$');
  protected maxPasswordLength: number = 15;
  protected minPasswordLength:number = 8;
  private maxLoginLength:number = 25;
  private minLoginLength:number = 4;

  constructor(private readonly formBuilder: NonNullableFormBuilder) {
    this._registerForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      [RegisterFormName.USERNAME]: this.formBuilder.control<string>('',{validators:this.validateLogin()}),
      [RegisterFormName.EMAIL]: this.formBuilder.control<string>('',{validators:Validators.pattern(RegisterFormService.EMAIL_PATTERN)}),
      [RegisterFormName.PASSWORD]: this.formBuilder.control<string>('',{validators:this.validatePassword()}),
      [RegisterFormName.PASSWORD_CONFIRMED]: this.formBuilder.control<string>(''),
      [RegisterFormName.FIRST_NAME]: this.formBuilder.control<string>(''),
      [RegisterFormName.LAST_NAME]: this.formBuilder.control<string>(''),
    });
  }

  private validatePassword(): ValidatorFn {
    return (control: AbstractControl) => {
      const passwordControl: FormControl = control as FormControl;

      const regexSpecialSigns = /^[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/]$|[\s]/.test(passwordControl.value);
      const regexPattern = /^[a-zA-Z0-9]$|[\s]/.test(passwordControl.value);

      if (passwordControl.value.length < 8 || passwordControl.value.length > 15) {
        return { error: 'Error password length' };
      }
      if (!regexPattern) {
        return { error: 'Error password length' };
      }
      if (!regexSpecialSigns) {
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
}
