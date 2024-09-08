import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { validate } from 'uuid';

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
      ['login']: this.formBuilder.control<string>('', { validators: this.validateLogin() }),
      ['password']: this.formBuilder.control<string>('',{validators:this.validatePaddword()})
    });
  }

  private validateLogin(): ValidatorFn {
    return (control: AbstractControl) => {
      const loginControl: FormControl<string> = control as FormControl;

      const regexSpecialSigns = /[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/]/.test(loginControl.value);
      if (loginControl.value.length < 4) {
        return { error: 'Error login lentgh' };
      }
      if (regexSpecialSigns) {
        return { error: 'Error login lentgh' };
      }
      return null;
    };
  }

  private validatePaddword(): ValidatorFn {
    return (control: AbstractControl) => {
      const passwordControl: FormControl = control as FormControl;

      const regexSpecialSigns = /[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/]/.test(passwordControl.value);
      const regexRegularLetters = /[a-z]/.test(passwordControl.value);
      const regexCapitalLetters = /[A-Z]/.test(passwordControl.value);
      const regexNumbers = /[0-9]/.test(passwordControl.value)

      if (passwordControl.value.length < 8) {
        return { error: 'Error password length' };
      }
      if (!regexRegularLetters) {
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
      return null;
    };
  }
}
