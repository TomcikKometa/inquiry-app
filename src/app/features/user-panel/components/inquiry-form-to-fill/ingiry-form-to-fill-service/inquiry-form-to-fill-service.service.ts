import { Injectable, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Inquiry } from '../../../../../@models/inquiry';
import { MultiselectQuestion, Question, ShortTextQuestion, SingleSelectQuestion } from '../../../../../@models/question';
import { QuestionType } from '../../../../../@enums/question-type';
import { MultiSelectAnswerFormName, SingleSelectAnswerFormName, ShortTextQuestionAnswerFormName } from './enums/inquiry-form-to-fill-enums';
import { SingleSelectAnswerForm, ShortTextQuestionAnswerForm, MultiSelectAnswerForm } from './models/inquiry-form-to-fill-model';

@Injectable()
export class InquiryFormToFillServiceService {
  private readonly formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  public createFormToFill(inquiry: Inquiry): FormArray {
    const formArray: FormArray = this.formBuilder.array([]);
    inquiry.questions.forEach((question: Question) => {
      switch (question.type) {
        case QuestionType.MULTISELECT:
          // formArray.push(this.createMultiSelectForm(question as MultiselectQuestion));
          break;
        case QuestionType.SHORT_TEXT:
          // formArray.push(this.createShortTextQuestionForm(question as ShortTextQuestion));
        case QuestionType.SCALE:

        case QuestionType.SINGLE_SELECT:
          // formArray.push(this.createSingleSelectForm(question as SingleSelectQuestion))
      }
    });
    return formArray;
  }

  private createMultiSelectForm(multiselectQuestion: MultiselectQuestion): FormGroup {
    return this.formBuilder.group<MultiSelectAnswerForm>({
      [MultiSelectAnswerFormName.QUESTION]: this.formBuilder.control<string>(multiselectQuestion.label),
      [MultiSelectAnswerFormName.TYPE]: this.formBuilder.control<QuestionType.MULTISELECT>(QuestionType.MULTISELECT),
      [MultiSelectAnswerFormName.ANSWERS]: this.formBuilder.array([])
    });
  }

  private createSingleSelectForm(singleSelectQuestion: SingleSelectQuestion): FormGroup {
    return this.formBuilder.group<SingleSelectAnswerForm>({
      [SingleSelectAnswerFormName.QUESTION]: this.formBuilder.control<string>(singleSelectQuestion.label),
      [SingleSelectAnswerFormName.TYPE]: this.formBuilder.control<QuestionType.SINGLE_SELECT>(QuestionType.SINGLE_SELECT),
      [SingleSelectAnswerFormName.ANSWERS]: this.formBuilder.array([])
    });
  }

  private createShortTextQuestionForm(shortTextQuestion: ShortTextQuestion): FormGroup {
    return this.formBuilder.group<ShortTextQuestionAnswerForm>({
      [ShortTextQuestionAnswerFormName.QUESTION]: this.formBuilder.control<string>(shortTextQuestion.label),
      [ShortTextQuestionAnswerFormName.TYPE]: this.formBuilder.control<QuestionType.SHORT_TEXT>(QuestionType.SHORT_TEXT),
      [ShortTextQuestionAnswerFormName.ANSWER]: this.formBuilder.array([])
    });
  }
}
