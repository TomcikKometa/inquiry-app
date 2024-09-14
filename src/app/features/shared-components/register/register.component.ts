import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RegisterFormName, RegisterFormService } from '../services/register-form/register.service';
import { debounceTime, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'inq-register',
  standalone: true,
  imports: [MatCardModule, FormsModule, ReactiveFormsModule,CommonModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  protected _registerForm!: FormGroup;

  protected isPasswordValid: boolean = false;

  private readonly registerFormService: RegisterFormService = inject(RegisterFormService);

  public ngOnInit(): void {
    this.registerFormService.isPasswordValid$.subscribe((x: boolean) => (this.isPasswordValid = x));
    this._registerForm = this.registerFormService._registerForm;
  }

  protected register() {
  }

  protected get registerForm(): FormGroup {
    return this._registerForm;
  }

  protected get registerFormName(): typeof RegisterFormName {
    return RegisterFormName;
  }

}
