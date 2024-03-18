import { Component, Input, inject } from '@angular/core';
import { FormGroup, AbstractControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { QuestionType } from '../../../../@enums/question-type';
import { ScaleSelectAnswerFormName, InquiryAnswersFormName } from '../@enums/inquiry-form-to-fill-enums';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'inq-scale-answer',
  standalone: true,
  imports: [MatSliderModule,MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './scale-answer.component.html',
  styleUrl: './scale-answer.component.css'
})
export class ScaleAnswerComponent {

  protected form!: FormGroup;
  protected isViewed: boolean = false;
  @Input({ required: true }) public itemIndex!: number;
  @Input({ required: true }) public item!: AbstractControl;

  private readonly rootFormGroup: FormGroupDirective = inject(FormGroupDirective);
  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
    const formGroup: FormGroup = this.item as FormGroup;
    if (formGroup.controls['type'].value === QuestionType.SCALE) {
      this.isViewed = true;
    }
  }

  protected get scaleSelectAnswerFormName(): typeof ScaleSelectAnswerFormName {
    return ScaleSelectAnswerFormName;
  }

  protected get inquiryAnswersFormName(): typeof InquiryAnswersFormName {
    return InquiryAnswersFormName
  }
}
