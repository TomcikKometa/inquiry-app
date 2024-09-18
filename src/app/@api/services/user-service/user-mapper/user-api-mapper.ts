import { FormGroup } from "@angular/forms";
import { RegisterFormName } from "../../../../features/shared-components/services/register-form/register.service";
import { UserLoginRequest } from "../models/user-login-request";
import { RegisterModel } from "../../../../features/shared-components/register/models/register-model";

export class UserApiMapper {
    public static mapUserLoginRequest(loginFormGroup: FormGroup): UserLoginRequest {
        return {
          username: loginFormGroup.get(RegisterFormName.USERNAME)!.value,
          password: loginFormGroup.get(RegisterFormName.PASSWORD)!.value
        };
      }

      public static mapRegisterModel(registerForm: FormGroup): RegisterModel {
        return {
          email: registerForm.get(RegisterFormName.EMAIL)?.value,
          firstName: registerForm.get(RegisterFormName.FIRST_NAME)?.value,
          lastName: registerForm.get(RegisterFormName.LAST_NAME)?.value,
          password: registerForm.get(RegisterFormName.PASSWORD)?.value,
          userName: registerForm.get(RegisterFormName.USERNAME)?.value
        };
      }
}