import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Inquiry } from '../../../../../@models/inquiry';
import {
  MultiSingleInquiryAnswer,
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
  SingleSelectAnswerForm,
  ShortTextQuestionAnswerForm,
  ScaleSelectAnswerForm,
  SingleSelectFormRadioButton,
  MultiSelectFormCheckbox,
  MultiSelectAnswerForm
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
    return this.formBuilder.group<MultiSelectAnswerForm>({
      [MultiSelectAnswerFormName.QUESTION]: this.formBuilder.control<string>(multiselectQuestion.label),
      [MultiSelectAnswerFormName.TYPE]: this.formBuilder.control<QuestionType.MULTISELECT>(QuestionType.MULTISELECT),
      [MultiSelectAnswerFormName.ANSWERS]:  this.handleAddMultiSelectForm(multiselectQuestion)
    });
  }

  private handleAddMultiSelectForm(multiselectQuestion: MultiselectQuestion) {
    const answerFormArray: FormArray = this.formBuilder.array([],this.ValidateMultiControls());
    multiselectQuestion.answers.forEach((answer: MultiSingleInquiryAnswer) => {
      answerFormArray.push(
        this.formBuilder.group<MultiSelectFormCheckbox>({
          [MultiSelectAnswerFormName.LABEL]: this.formBuilder.control<string>({ value: answer.answer, disabled: true }),
          [MultiSelectAnswerFormName.ID]: this.formBuilder.control<string>(answer.id!),
          [MultiSelectAnswerFormName.IS_SELECTED]: this.formBuilder.control<boolean>(false)
        })
      );
    });
    return answerFormArray as FormArray;
  }

  private createSingleSelectForm(singleSelectQuestion: SingleSelectQuestion): FormGroup {
    return this.formBuilder.group<SingleSelectAnswerForm>({
      [SingleSelectAnswerFormName.QUESTION]: this.formBuilder.control<string>(singleSelectQuestion.label),
      [SingleSelectAnswerFormName.TYPE]: this.formBuilder.control<QuestionType.SINGLE_SELECT>(QuestionType.SINGLE_SELECT),
      [SingleSelectAnswerFormName.ANSWERS]: this.handleAddSingleSelectForm(singleSelectQuestion),
      [SingleSelectAnswerFormName.SELECTED_ANSWER]: this.formBuilder.control<string>('',Validators.required)
    });
  }

  private handleAddSingleSelectForm(singleSelectQuestion: SingleSelectQuestion) {
    const answerFormArray: FormArray = this.formBuilder.array([]);
    singleSelectQuestion.answers.forEach((answer: MultiSingleInquiryAnswer) => {
      answerFormArray.push(
        this.formBuilder.group<SingleSelectFormRadioButton>({
          [SingleSelectAnswerFormName.LABEL]: this.formBuilder.control<string>({ value: answer.answer, disabled: true }),
          [SingleSelectAnswerFormName.ID]: this.formBuilder.control<string>(answer.id!)
        })
      );
    });
    return answerFormArray as FormArray;
  }

  private createShortTextQuestionForm(shortTextQuestion: ShortTextQuestion): FormGroup {
    return this.formBuilder.group<ShortTextQuestionAnswerForm>({
      [ShortTextQuestionAnswerFormName.QUESTION]: this.formBuilder.control<string>({
        value: shortTextQuestion ? shortTextQuestion.label : '',
        disabled: true
      }),
      [ShortTextQuestionAnswerFormName.TYPE]: this.formBuilder.control<QuestionType.SHORT_TEXT>(QuestionType.SHORT_TEXT),
      [ShortTextQuestionAnswerFormName.ANSWER]: this.formBuilder.control<string>('',Validators.required)
    });
  }

  private createScleSelectForm(scaleQuestion: ScaleQuestion): FormGroup {
    return this.formBuilder.group<ScaleSelectAnswerForm>({
      [ScaleSelectAnswerFormName.QUESTION]: this.formBuilder.control<string>(scaleQuestion.label),
      [ScaleSelectAnswerFormName.TYPE]: this.formBuilder.control<QuestionType.SCALE>(QuestionType.SCALE),
      [ScaleSelectAnswerFormName.ANSWER]: this.formBuilder.control<number>(0,this.ValidateScaleControls()),
      [ScaleSelectAnswerFormName.MAX_VALUE]: this.formBuilder.control<number>(scaleQuestion.max),
      [ScaleSelectAnswerFormName.MIN_VALUE]: this.formBuilder.control<number>({ value: scaleQuestion.min, disabled: true }),
      [ScaleSelectAnswerFormName.STEP_SIZE]: this.formBuilder.control<number>(scaleQuestion.stepSize)
    });
  }

  private ValidateMultiControls(): ValidatorFn {
    return (control: AbstractControl) => {
      const answerFromArray: FormArray = control as FormArray;
      const answers = [];
      for (let i = 0; i < answerFromArray.controls.length; i++) {
        if(answerFromArray.get(i.toString())?.get('isSelected')?.value === true){
          answers.push('answer')
        }
      }
      if(answers.length < 1) {
        return { error: 'Error values' };
      }
      return null;
    };
  }

  private ValidateScaleControls(): ValidatorFn {
    return (control: AbstractControl) => {
      if(!control.value) {
        return { error: 'Error values' };
      }
      return null;
    };
  }
}
