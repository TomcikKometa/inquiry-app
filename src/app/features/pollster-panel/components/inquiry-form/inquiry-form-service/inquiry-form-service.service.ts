import { Injectable, inject } from '@angular/core';
import { QuestionType } from '../../../../../@enums/question-type';
import { MultiselectQuestion, ScaleQuestion, ShortTextQuestion, SingleSelectQuestion } from '../../../../../@models/question';
import { Validators, FormArray, FormGroup, NonNullableFormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import {
  InquiryFormName,
  MultiSelectQuestionFormName,
  ScaleSelectQuestionFormName,
  ShortTextQuestionFormName,
  SingleSelectQuestionFormName,
  TypeQuestion
} from '../@enum/form-enum';
import {
  MultiSelectQuestionForm,
  ScaleSelectQuestionForm,
  ShortTextQuestionForm,
  SingleSelectQuestionForm
} from '../@models/questions-forms';

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    const formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
    return new InquiryFormServiceService(formBuilder);
  }
})
export class InquiryFormServiceService {
  static lastIDquestionsArrayReverse: number = 0;
  static isAnswerToMultiSelect: boolean = false;
  static isAnswerToSingleSelect: boolean = false;
  static isEditForm: boolean = false;
  static _inquiryForm: FormGroup;
  static formBuilder: NonNullableFormBuilder;

  constructor(formBuilder: NonNullableFormBuilder) {
    InquiryFormServiceService.formBuilder = formBuilder;
  }

  public static addShortTextQuestionForm(_inquiryForm: FormGroup, shortTextQuestion?: ShortTextQuestion): FormArray {
    this._inquiryForm = _inquiryForm;
    const questions: FormArray = this._inquiryForm.get(InquiryFormName.QUESTIONS) as FormArray;
    questions.push(
      this.formBuilder.group<ShortTextQuestionForm>({
        [ShortTextQuestionFormName.QUESTION]: this.formBuilder.control<string>(
          shortTextQuestion ? shortTextQuestion.label : '',
          Validators.required
        ),
        [ShortTextQuestionFormName.ANSWER]: this.formBuilder.control<string>(
          shortTextQuestion ? shortTextQuestion.answer : '',
          Validators.required
        ),
        [ShortTextQuestionFormName.ID]: this.formBuilder.control<string>((questions.controls.length + 1).toString()),
        [TypeQuestion.TYPE]: this.formBuilder.control<QuestionType.SHORT_TEXT>(QuestionType.SHORT_TEXT)
      })
    );
    return questions;
  }

  public static addMultiSelectForm(_inquiryForm: FormGroup, multiselectQuestion?: MultiselectQuestion): FormArray {
    this._inquiryForm = _inquiryForm;
    const answerFormArray: FormArray = this.formBuilder.array([], { validators: [this.validatorSelectForm()] });

    if (!multiselectQuestion) {
      answerFormArray.push(this.formBuilder.control('', Validators.required));
      answerFormArray.push(this.formBuilder.control('', Validators.required));
    } else {
      multiselectQuestion.answers.forEach((answer: string) => {
        answerFormArray.push(this.formBuilder.control(answer, Validators.required));
      });
    }
    const questions: FormArray = this._inquiryForm.get(InquiryFormName.QUESTIONS) as FormArray;
    questions.push(
      this.formBuilder.group<MultiSelectQuestionForm>({
        [MultiSelectQuestionFormName.QUESTION]: this.formBuilder.control<string>(
          multiselectQuestion ? multiselectQuestion.label : '',
          Validators.required
        ),
        [MultiSelectQuestionFormName.ID]: this.formBuilder.control<string>((questions.controls.length + 1).toString()),
        [TypeQuestion.TYPE]: this.formBuilder.control<QuestionType.MULTISELECT>(QuestionType.MULTISELECT),
        [MultiSelectQuestionFormName.ANSWERS]: answerFormArray
      })
    );
    return questions;
  }

  private static validatorSelectForm(): ValidatorFn {
    return (control: AbstractControl) => {
      const answerFromArray: FormArray = control as FormArray;
      if (answerFromArray.controls.length < 2) {
        return { error: 'Error values' };
      }
      return null;
    };
  }

  public static addScaleSelectForm(_inquiryForm: FormGroup, scaleQuestion?: ScaleQuestion) {
    this._inquiryForm = _inquiryForm;
    const questions: FormArray = this._inquiryForm.get(InquiryFormName.QUESTIONS) as FormArray;
    questions.push(
      this.formBuilder.group<ScaleSelectQuestionForm>(
        {
          [ScaleSelectQuestionFormName.QUESTION]: this.formBuilder.control<string>(
            scaleQuestion ? scaleQuestion.label : '',
            Validators.required
          ),
          [ScaleSelectQuestionFormName.ID]: this.formBuilder.control<string>((questions.controls.length + 1).toString()),
          [TypeQuestion.TYPE]: this.formBuilder.control<QuestionType.SCALE>(QuestionType.SCALE),
          [ScaleSelectQuestionFormName.MAX_VALUE]: this.formBuilder.control<number>(scaleQuestion ? scaleQuestion.max : 0),
          [ScaleSelectQuestionFormName.MIN_VALUE]: this.formBuilder.control<number>(scaleQuestion ? scaleQuestion.min : 0),
          [ScaleSelectQuestionFormName.STEP_SIZE]: this.formBuilder.control<number>(scaleQuestion ? scaleQuestion.stepSize : 0)
        },
        { validators: [this.validateScaleSelectForm()] }
      )
    );
    return questions;
  }

  private static validateScaleSelectForm(): ValidatorFn {
    return (control: AbstractControl) => {
      const maxValue = control.get(ScaleSelectQuestionFormName.MAX_VALUE)?.value;
      const minValue = control.get(ScaleSelectQuestionFormName.MIN_VALUE)?.value;
      const stepSize = control.get(ScaleSelectQuestionFormName.STEP_SIZE)?.value;

      if (maxValue === null || minValue === null || stepSize === null) {
        return { error: 'Error values' };
      }

      if (maxValue <= 0 || minValue < 0 || stepSize < 1) {
        return { error: 'Error values' };
      }

      if (maxValue <= minValue) {
        return { error: 'Error values' };
      }
      if ((maxValue - minValue) % stepSize !== 0) {
        return { error: 'Error value' };
      }

      if (stepSize > (maxValue - minValue) / 2) {
        return { error: 'Error value' };
      }
      return null;
    };
  }

  public static addSingleSelectForm(_inquiryForm: FormGroup, singleSelectQuestion?: SingleSelectQuestion) {
    this._inquiryForm = _inquiryForm;
    const answerFormArray: FormArray = this.formBuilder.array([], { validators: [this.validatorSelectForm()] });

    if (!singleSelectQuestion) {
      answerFormArray.push(this.formBuilder.control('', Validators.required));
      answerFormArray.push(this.formBuilder.control('', Validators.required));
    } else {
      singleSelectQuestion.answers.forEach((answer: string) => {
        answerFormArray.push(this.formBuilder.control(answer, Validators.required));
      });
    }
    const questions: FormArray = this._inquiryForm.get(InquiryFormName.QUESTIONS) as FormArray;

    questions.push(
      this.formBuilder.group<SingleSelectQuestionForm>({
        [SingleSelectQuestionFormName.QUESTION]: this.formBuilder.control<string>(
          singleSelectQuestion ? singleSelectQuestion.label : '',
          Validators.required
        ),
        [SingleSelectQuestionFormName.ID]: this.formBuilder.control<string>((questions.controls.length + 1).toString()),
        [TypeQuestion.TYPE]: this.formBuilder.control<QuestionType.SINGLE_SELECT>(QuestionType.SINGLE_SELECT),
        [SingleSelectQuestionFormName.ANSWERS]: answerFormArray
      })
    );
    this.countQuestionControls(questions);
    return questions;
    
  }

  public static countQuestionControls(questions: FormArray): number {
    const questionsLength = +questions.controls['length'];
    const questionsArray: SingleSelectQuestionForm | MultiSelectQuestionForm[] = [];
    for (let i = 0; i < questionsLength; i++) {
      questionsArray.push(questions.controls[i].value);
    }
    const questionsArrayReverse = questionsArray?.reverse();
    const lastIDquestionsArrayReverse = questionsArrayReverse[0]?.id;
    this.lastIDquestionsArrayReverse = +lastIDquestionsArrayReverse;
    console.log(lastIDquestionsArrayReverse);
    
    return +lastIDquestionsArrayReverse
  }
}
