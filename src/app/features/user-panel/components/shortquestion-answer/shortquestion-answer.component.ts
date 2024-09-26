import { Component, Input, inject } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QuestionType } from '../../../../enums/question-type';
import { TypeQuestion } from '../../../pollster-panel/components/inquiry-form/@enum/form-enum';
import { InquiryAnswersFormName, ShortTextQuestionAnswerFormName } from '../@enums/inquiry-form-to-fill-enums';

@Component({
  selector: 'inq-shortquestion-answer',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './shortquestion-answer.component.html',
  styleUrl: './shortquestion-answer.component.css'
})
export class ShortquestionAnswerComponent {
  public form!: FormGroup;
  protected isViewed: boolean = false;
  @Input({ required: true }) public itemIndex!: number;
  @Input({ required: true }) public item!: AbstractControl;

  private readonly rootFormGroup: FormGroupDirective = inject(FormGroupDirective);

  public ngOnInit() {
    this.form = this.rootFormGroup.control;
    if (this.item.get(TypeQuestion.TYPE)?.value === QuestionType.SHORT_TEXT) {
      this.isViewed = true;
    }
  }

  protected get shortTextQuestionAnswerFormName(): typeof ShortTextQuestionAnswerFormName {
    return ShortTextQuestionAnswerFormName
  }

  protected get inquiryAnswersFormName(): typeof InquiryAnswersFormName{
    return InquiryAnswersFormName
  }

  protected get questionLabel() : string {
    return this.item.get(ShortTextQuestionAnswerFormName.QUESTION)?.value
  }

  protected get formItem(): FormGroup {
    return this.item as FormGroup;
  }
  
}
