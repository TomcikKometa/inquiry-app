import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Inquiry } from '../../../../../@models/inquiry';
import {
  InquiryAnswer,
  MultiselectQuestion,
  Question,
  ScaleQuestion,
  ShortTextQuestion,
  SingleSelectQuestion
} from '../../../../../@models/question';
import { QuestionType } from '../../../../../@enums/question-type';
import {
  MultiSelectAnswerFormName,
  SingleSelectAnswerFormName,
  ShortTextQuestionAnswerFormName,
  ScaleSelectAnswerFormName
} from '../../@enums/inquiry-form-to-fill-enums';
import {
  MultiSelectAnswerForm,
  SingleSelectAnswerForm,
  ShortTextQuestionAnswerForm,
  ScaleSelectAnswerForm
} from '../../@models/inquiry-form-to-fill-model';

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
          formArray.push(this.createShortTextQuestionForm(question as ShortTextQuestion));
          break;
        case QuestionType.SCALE:
          formArray.push(this.createScleSelectForm(question as ScaleQuestion));
          break;
        case QuestionType.SINGLE_SELECT:
          formArray.push(this.createSingleSelectForm(question as SingleSelectQuestion));
          break;
        default:
          console.error('Error type of question type');
      }
    });
    return formArray;
  }

  private createMultiSelectForm(multiselectQuestion: MultiselectQuestion): FormGroup {
    return this.formBuilder.group<any>({
      [MultiSelectAnswerFormName.QUESTION]: this.formBuilder.control<string>(multiselectQuestion.label),
      [MultiSelectAnswerFormName.TYPE]: this.formBuilder.control<QuestionType.MULTISELECT>(QuestionType.MULTISELECT),
      [MultiSelectAnswerFormName.ANSWERS]: this.handleAddMultiSelectForm(multiselectQuestion)
    });
  }

  private handleAddMultiSelectForm(multiselectQuestion: MultiselectQuestion) {
    const answerFormArray: FormArray = this.formBuilder.array([]);
    multiselectQuestion.answers.forEach((answer: InquiryAnswer) => {
      answerFormArray.push(
        this.formBuilder.group<any>({
          label: this.formBuilder.control<string>({value:answer.answer,disabled:true}),
          isSelected: this.formBuilder.control<boolean>(answer.isSelected!),
          id: this.formBuilder.control<string>(answer.id!)
        })
      );
    });
    return answerFormArray as FormArray;
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
      [ShortTextQuestionAnswerFormName.QUESTION]: this.formBuilder.control<string>({ value: shortTextQuestion ? shortTextQuestion.answer : '', disabled: true }),
      [ShortTextQuestionAnswerFormName.TYPE]: this.formBuilder.control<QuestionType.SHORT_TEXT>(QuestionType.SHORT_TEXT),
      [ShortTextQuestionAnswerFormName.ANSWER]: this.formBuilder.control<string>(
        { value: shortTextQuestion ? shortTextQuestion.answer : '', disabled: false },
      )
    });
  }

  private createScleSelectForm(scaleQuestion: ScaleQuestion): FormGroup {
    return this.formBuilder.group<ScaleSelectAnswerForm>({
      [ScaleSelectAnswerFormName.QUESTION]: this.formBuilder.control<string>(scaleQuestion.label),
      [ScaleSelectAnswerFormName.TYPE]: this.formBuilder.control<QuestionType.SCALE>(QuestionType.SCALE),
      [ScaleSelectAnswerFormName.VALUE]:this.formBuilder.control<number>(scaleQuestion.min)
    });
  }

  private validatorSelectForm(): ValidatorFn {
    return (control: AbstractControl) => {
      const answerFromArray: FormArray = control as FormArray;
      if (answerFromArray.controls.length < 2) {
        return { error: 'Error values' };
      }
      return null;
    };
  }
}
