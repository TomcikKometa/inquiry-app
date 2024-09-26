import { Component, Input, OnInit, inject, input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionType } from '../../../../enums/question-type';
import { InquiryAnswersFormName, ScaleSelectAnswerFormName, SingleSelectAnswerFormName } from '../@enums/inquiry-form-to-fill-enums';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { TypeQuestion } from '../../../pollster-panel/components/inquiry-form/@enum/form-enum';

@Component({
  selector: 'inq-singleselect-answer',
  standalone: true,
  imports: [MatCheckboxModule, MatRadioModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './singleselect-answer.component.html',
  styleUrl: './singleselect-answer.component.css'
})
export class SingleselectAnswerComponent implements OnInit {
  protected form!: FormGroup;
  protected answer: string = '';
  protected isViewed: boolean = false;
  labelPosition = 'a';

  @Input({ required: true }) public itemIndex!: number;
  @Input({ required: true }) public item!: AbstractControl;

  private readonly rootFormGroup: FormGroupDirective = inject(FormGroupDirective);

  public ngOnInit(): void {
    this.form = this.rootFormGroup.control;
    if (this.item.get(TypeQuestion.TYPE)?.value === QuestionType.SINGLE_SELECT) {
      this.isViewed = true;
    }
  }

  protected get answersFormArray(): FormArray {
    return this.item.get(InquiryAnswersFormName.ANSWERS) as FormArray;
  }
  protected get singleSelectAnswerFormName(): typeof SingleSelectAnswerFormName {
    return SingleSelectAnswerFormName;
  }

  protected get inquiryFormName(): typeof InquiryAnswersFormName {
    return InquiryAnswersFormName;
  }

  protected get formItem(): FormGroup {
    return this.item as FormGroup;
  }

  protected get questionLabel() : string {
    return this.item.get(SingleSelectAnswerFormName.QUESTION)?.value
  }
}
