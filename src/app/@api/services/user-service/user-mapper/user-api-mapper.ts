import { FormGroup } from "@angular/forms";
import { RegisterFormName } from "../../../../features/shared-components/services/register-form/register.service";
import { UserLoginRequest } from "../models/user-login-request";

export class UserApiMapper {
    public static mapUserLoginRequest(loginFormGroup: FormGroup): UserLoginRequest {
      console.log(loginFormGroup);
      
        return {
          username: loginFormGroup.get(RegisterFormName.USERNAME)!.value,
          password: loginFormGroup.get(RegisterFormName.PASSWORD)!.value
        };
      }
}