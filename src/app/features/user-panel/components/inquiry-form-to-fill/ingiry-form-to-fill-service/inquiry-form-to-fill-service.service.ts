import { Injectable, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Inquiry } from '../../../../../@models/inquiry';
import { MultiSelectAnswerForm } from './models/inquiry-form-to-fill-model';
import { MultiselectAnswerFormName } from './enums/inquiry-form-to-fill-enums';
import { MultiselectQuestion, Question } from '../../../../../@models/question';
import { QuestionType } from '../../../../../@enums/question-type';

@Injectable()
export class InquiryFormToFillServiceService {
  private readonly formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  public createFormToFill(inquiry: Inquiry): FormArray {
    const formArray: FormArray = this.formBuilder.array([]);
    inquiry.questions.forEach((question: Question) => {
      switch (question.type) {
        case QuestionType.MULTISELECT:
          formArray.push(this.createMultiSelectForm(question as MultiselectQuestion));
          break;
        case QuestionType.SHORT_TEXT:
        case QuestionType.SCALE:
        case QuestionType.SINGLE_SELECT:
      }
    });
    return formArray;
  }

  private createMultiSelectForm(multiselectQuestion: MultiselectQuestion): FormGroup {
    return this.formBuilder.group<MultiSelectAnswerForm>({
      [MultiselectAnswerFormName.QUESTION]: this.formBuilder.control<string>(multiselectQuestion.label),
      [MultiselectAnswerFormName.TYPE]: this.formBuilder.control<QuestionType.MULTISELECT>(QuestionType.MULTISELECT),
      [MultiselectAnswerFormName.ANSWERS]: this.formBuilder.array([])
    });
  }
}
