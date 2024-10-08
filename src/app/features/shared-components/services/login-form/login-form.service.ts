import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { RegisterFormName } from '../register-form/register.service';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {
  public _loginForm!: FormGroup;

  constructor(private readonly formBuilder: NonNullableFormBuilder) {
    this._loginForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      [RegisterFormName.USERNAME]: this.formBuilder.control<string>('', { validators: this.validateLogin(),updateOn:'blur' }),
      [RegisterFormName.PASSWORD]: this.formBuilder.control<string>('',{validators:this.validatePassword()})
    });
  }

  private validateLogin(): ValidatorFn {
    return (control: AbstractControl) => {
      const loginControl: FormControl<string> = control as FormControl;

      const regexSpecialSigns = /[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/]|[\s]/.test(loginControl.value);
      const firstFiveCharacters = loginControl.value.slice(0, 3);
      const regexNoFirstNumbers = /^[a-zA-Z]{0,3}$|[\s]/.test(firstFiveCharacters);

      if (loginControl.value.length < 4 || loginControl.value.length > 25) {
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

  private validatePassword(): ValidatorFn {
    return (control: AbstractControl) => {
      const passwordControl: FormControl = control as FormControl;

      const regexSpecialSigns = /[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/].{0,20}$/.test(passwordControl.value);
      const regexLowLetters = /[a-z].{0,20}$/.test(passwordControl.value);
      const regexCapitalLetters = /[A-Z].{0,20}$/.test(passwordControl.value);
      const regexNumbers = /[0-9].{0,20}$/.test(passwordControl.value);
      const noBlankSpace = /^$|[\s]/.test(passwordControl.value);

      if (passwordControl.value.length < 8 || passwordControl.value.length > 15) {
        return { error: 'Error password length' };
      }
      if (!regexLowLetters) {
        return { error: 'Error password length' };
      }
      if (!regexCapitalLetters) {
        return { error: 'Error password length' };
      }
      if (!regexSpecialSigns) {
        return { error: 'Error password length' };
      }
      if (!regexNumbers) {
        return { error: 'Error password length' };
      }
      if (noBlankSpace) {
        return { error: 'Error password length' };
      }
      return null;
    };
  }
}
