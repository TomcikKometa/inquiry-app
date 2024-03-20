import { Component, Input, inject } from '@angular/core';
import { FormGroup, AbstractControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { QuestionType } from '../../../../@enums/question-type';
import { ScaleSelectAnswerFormName, InquiryAnswersFormName } from '../@enums/inquiry-form-to-fill-enums';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { Subject, pipe, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'inq-scale-answer',
  standalone: true,
  imports: [MatSliderModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './scale-answer.component.html',
  styleUrl: './scale-answer.component.css'
})
export class ScaleAnswerComponent {
  protected form!: FormGroup;
  protected isViewed: boolean = false;
  minSteperValue: number = 0;
  maxSteperValue: number = 0;
  stepSizeValue: number = 0;
  protected isChosenMaxValue:boolean = false;

  @Input({ required: true }) public itemIndex!: number;
  @Input({ required: true }) public item!: AbstractControl;

  private readonly rootFormGroup: FormGroupDirective = inject(FormGroupDirective);
  private readonly _destroy: Subject<void> = new Subject<void>();
  
  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
    const formGroup: FormGroup = this.item as FormGroup;
    if (formGroup.controls['type'].value === QuestionType.SCALE) {
      this.isViewed = true;
      this.item ? this.pripareSliderValues() : 0;
    }
    this.item.get('answer')?.valueChanges.pipe(takeUntil(this._destroy)).subscribe((answer:number) =>{
      this.isChosenMaxValue = answer === this.item.get('maxValue')?.value;
    })
  }

  private pripareSliderValues(): void {
    this.minSteperValue = this.item.get('minValue')?.value;
    this.maxSteperValue = this.item.get('maxValue')?.value;
    this.stepSizeValue = this.item.get('stepSize')?.value;
  }

  protected get scaleSelectAnswerFormName(): typeof ScaleSelectAnswerFormName {
    return ScaleSelectAnswerFormName;
  }

  protected get inquiryAnswersFormName(): typeof InquiryAnswersFormName {
    return InquiryAnswersFormName;
  }
}
