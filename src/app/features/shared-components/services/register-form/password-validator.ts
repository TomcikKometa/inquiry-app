import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RegisterFormName } from './register.service';

export const matchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let password = control.get(RegisterFormName.PASSWORD);
  let passwordConfirmed = control.get(RegisterFormName.PASSWORD_CONFIRMED);
  if (password && passwordConfirmed && password?.value != passwordConfirmed?.value) {
    return {
      passwordMatchError: true
    };
  }
  return null;
};
