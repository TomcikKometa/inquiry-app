import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RegisterFormName, RegisterFormService } from '../services/register-form/register.service';

@Component({
  selector: 'inq-register',
  standalone: true,
  imports: [MatCardModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  protected _registerForm!: FormGroup;
  isRequired = false;
  place="ddd"

  private readonly registerFormService: RegisterFormService = inject(RegisterFormService);

  public ngOnInit(): void {
    this._registerForm = this.registerFormService._registerForm;
    console.log(this._registerForm);
  }

  protected register(){
    console.log(this._registerForm);
  }

  protected get registerForm(): FormGroup {
    return this._registerForm;
  }

  protected get registerFormName(): typeof RegisterFormName {
    return RegisterFormName;
  }

  invalid(event:any){
    console.log(event);
    
  }
}
