import { Injectable } from '@angular/core';
import { Validators, FormArray, FormGroup, NonNullableFormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import {
  InquiryQuestionsFormName,
  MultiSelectQuestionFormName,
  ScaleSelectQuestionFormName,
  ShortTextQuestionFormName,
  SingleSelectQuestionFormName,
  TypeQuestion
} from '../@enum/form-enum';
import {
  MultiSelectQuestionForm,
  QuestionsForm,
  ScaleSelectQuestionForm,
  ShortTextQuestionForm,
  SingleSelectQuestionForm
} from '../@models/questions-forms';
import { Inquiry } from '../../../../../models/inquiry';
import { QuestionType } from '../../../../../enums/question-type';
import { Question, MultiSelectQuestion, ScaleQuestion, ShortTextQuestion, SingleSelectQuestion, SingleSelectAnswer } from '../../../../../models/question';

@Injectable()
export class InquiryFormService {
  public _inquiryForm: FormGroup;

  constructor(private readonly formBuilder: NonNullableFormBuilder) {
    this._inquiryForm = this.createForm();
  }

  private createForm(): FormGroup<QuestionsForm> {
    return this.formBuilder.group<QuestionsForm>({
      [InquiryQuestionsFormName.INQUIRY_NAME]: this.formBuilder.control<string>('', Validators.required),
      [InquiryQuestionsFormName.QUESTIONS]: this.formBuilder.array([])
    });
  }

  public fillEditForm(inquiry?: Inquiry): void {
    if (inquiry) {
      this._inquiryForm.get(InquiryQuestionsFormName.INQUIRY_NAME)?.patchValue(inquiry.name);
      inquiry.questions.forEach((question: Question) => {
        switch (question.type) {
          case QuestionType.MULTISELECT:
            this.addMultiSelectForm(question as MultiSelectQuestion);
            break;
          case QuestionType.SCALE:
            this.addScaleSelectForm(question as ScaleQuestion);
            break;
          case QuestionType.SHORT_TEXT:
            this.addShortTextQuestionForm(question as ShortTextQuestion);
            break;
          case QuestionType.SINGLE_SELECT:
            this.addSingleSelectForm(question as SingleSelectQuestion);
            break;
          default:
            console.error('Unknown queston type');
        }
      });
    }
  }

  public addShortTextQuestionForm(shortTextQuestion?: ShortTextQuestion): void {
    const questions: FormArray = this._inquiryForm?.get(InquiryQuestionsFormName.QUESTIONS) as FormArray;
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
  }

  public addMultiSelectForm(multiselectQuestion?: MultiSelectQuestion): void {
    const questions: FormArray = this._inquiryForm?.get(InquiryQuestionsFormName.QUESTIONS) as FormArray;
    
    questions.push(
      this.formBuilder.group<MultiSelectQuestionForm>({
        [MultiSelectQuestionFormName.QUESTION]: this.formBuilder.control<string>(
          multiselectQuestion ? multiselectQuestion.label : '',
          Validators.required
        ),
        [MultiSelectQuestionFormName.ID]: this.formBuilder.control<string>((questions.controls.length + 1).toString()),
        [TypeQuestion.TYPE]: this.formBuilder.control<QuestionType.MULTISELECT>(QuestionType.MULTISELECT),
        [MultiSelectQuestionFormName.ANSWERS]: this.handleAddMultiSelectForm(multiselectQuestion)
      })
    );
  }

  private handleAddMultiSelectForm(multiselectQuestion: any) {
    const answerFormArray: FormArray = this.formBuilder.array([], { validators: [this.validatorSelectForm()] });
    if (!multiselectQuestion) {
      answerFormArray.push(this.formBuilder.control('', Validators.required));
      answerFormArray.push(this.formBuilder.control('', Validators.required));
    } else {
      multiselectQuestion.answers.forEach((answer: SingleSelectAnswer) => {
        answerFormArray.push(this.formBuilder.group<any>({
            'label': this.formBuilder.control<string>(answer.answer),
            'id': this.formBuilder.control<string>(answer.id!),
          }))
      });
    }
    return answerFormArray;
  }

  public addScaleSelectForm(scaleQuestion?: ScaleQuestion): void {
    const questions: FormArray = this._inquiryForm?.get(InquiryQuestionsFormName.QUESTIONS) as FormArray;
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
  }

  private validateScaleSelectForm(): ValidatorFn {
    return (control: AbstractControl) => {
      const maxValue = control.get(ScaleSelectQuestionFormName.MAX_VALUE)?.value;
      const minValue = control.get(ScaleSelectQuestionFormName.MIN_VALUE)?.value;
      const stepSize = control.get(ScaleSelectQuestionFormName.STEP_SIZE)?.value;

      if (maxValue === null || minValue === null || stepSize === null) {
        return { error: '400' };
      }

      if (maxValue <= 0 || minValue < 0 || stepSize < 1) {
        return { error: '400' };
      }

      if (maxValue <= minValue) {
        return { error: '400' };
      }
      if ((maxValue - minValue) % stepSize !== 0) {
        return { error: '400' };
      }

      if (stepSize > (maxValue - minValue) / 2) {
        return { error: '400' };
      }
      return null;
    };
  }

  public addSingleSelectForm(singleSelectQuestion?: SingleSelectQuestion): void {
    const questions: FormArray = this._inquiryForm?.get(InquiryQuestionsFormName.QUESTIONS) as FormArray;
    questions.push(
      this.formBuilder.group<SingleSelectQuestionForm>({
        [SingleSelectQuestionFormName.QUESTION]: this.formBuilder.control<string>(
          singleSelectQuestion ? singleSelectQuestion.label : '',
          Validators.required
        ),
        [SingleSelectQuestionFormName.ID]: this.formBuilder.control<string>((questions.controls.length + 1).toString()),
        [TypeQuestion.TYPE]: this.formBuilder.control<QuestionType.SINGLE_SELECT>(QuestionType.SINGLE_SELECT),
        [SingleSelectQuestionFormName.ANSWERS]: this.handleAddSingleSelectForm(singleSelectQuestion)
      })
    );
  }

  private handleAddSingleSelectForm(singleSelectQuestion?: SingleSelectQuestion): FormArray {
    const answerFormArray: FormArray = this.formBuilder.array([], { validators: [this.validatorSelectForm()] });

    if (!singleSelectQuestion) {
      answerFormArray.push(this.formBuilder.control('', Validators.required));
      answerFormArray.push(this.formBuilder.control('', Validators.required));
    } else {
      singleSelectQuestion.answers.forEach((answer: SingleSelectAnswer) => {
        answerFormArray.push(this.formBuilder.control(answer.answer, Validators.required));
      });
    }
    return answerFormArray
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
