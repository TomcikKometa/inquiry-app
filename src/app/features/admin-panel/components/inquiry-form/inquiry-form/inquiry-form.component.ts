import { Component, inject } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormArray,
  NonNullableFormBuilder,
  AbstractControl,
  ValidatorFn,
  Validators,
  Form
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
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
  QuestionsForm,
  ScaleSelectQuestionForm,
  ShortTextQuestionForm,
  SingleSelectQuestionForm
} from '../@models/questions-forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QuestionComponent } from '../../question/question.component';
import { SingleSelectComponent } from '../../single-select/single-select.component';
import { ScaleSelectComponent } from '../../scale-select/scale-select.component';
import { ButtonAddAnswerComponent } from '../../button-multi-select/button-multi-select/button-add-answer.component';
import { Inquiry } from '../../../../../@models/inquiry';
import { QuestionType } from '../../../../../@enums/question-type';
import { InquiryMapper } from '../../../../../@api/services/mapper/inquiry-mapper';
import { InquiryService } from '../../../../../@api/services/inquiry-service/inquiry.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { MultiselectQuestion, Question, ScaleQuestion, ShortTextQuestion, SingleSelectQuestion } from '../../../../../@models/question';
import { MultiSelectComponent } from '../../multi-select/multi-select.component';

@Component({
  selector: 'inq-inquiry-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    QuestionComponent,
    SingleSelectComponent,
    ScaleSelectComponent,
    ButtonAddAnswerComponent,
    MultiSelectComponent
  ],
  providers: [ToastrService],
  templateUrl: './inquiry-form.component.html',
  styleUrl: './inquiry-form.component.css'
})
export class InquiryFormComponent {
  protected lastIDquestionsArrayReverse: number = 0;
  protected isAnswerToMultiSelect: boolean = false;
  protected isAnswerToSingleSelect: boolean = false;
  protected isEditForm: boolean = false;
  protected inquiry!: AbstractControl;
  private _inquiryForm!: FormGroup;

  private readonly formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private readonly inquiryService: InquiryService = inject(InquiryService);
  private readonly dialogRef: MatDialogRef<InquiryFormComponent> = inject(MatDialogRef);
  protected readonly editInquiryID: string | undefined = inject(MAT_DIALOG_DATA);

  public ngOnInit(): void {
    if (!this.editInquiryID) {
      this.isEditForm = false;
      this._inquiryForm = this.createNewForm();
    } else {
      this.isEditForm = true;
      this.inquiryService
        .editInqiry(this.editInquiryID)
        .pipe(first())
        .subscribe((inquiry: Inquiry) => {
          this.createForm(inquiry);
        });
    }
  }

  private createForm(inquiry?: Inquiry): void {
    if (inquiry) {
      inquiry.questions.forEach((question: Question) => {
        switch (question.type) {
          case QuestionType.MULTISELECT:
            this.addMultiSelectForm(question as MultiselectQuestion, inquiry);
            break;
          case QuestionType.SCALE:
            this.addScaleSelectForm(question as ScaleQuestion, inquiry);
            break;
          case QuestionType.SHORT_TEXT:
            this.addShortTextQuestionForm(question as ShortTextQuestion, inquiry);
            break;
          case QuestionType.SINGLE_SELECT:
            this.addSingleSelectForm(question as SingleSelectQuestion, inquiry);
            break;
          default:
            console.error('Unknown queston type');
        }
      });
    }
  }

  private createNewForm(): FormGroup<QuestionsForm> {
    return (this._inquiryForm = this.formBuilder.group<QuestionsForm>({
      [InquiryFormName.INQUIRY_NAME]: this.formBuilder.control<string>('', Validators.required),
      [InquiryFormName.QUESTIONS]: this.formBuilder.array([])
    }));
  }

  protected addShortTextQuestionForm(shortTextQuestion?: ShortTextQuestion, inquiry?: Inquiry) {
    this.isAnswerToMultiSelect = false;
    this.isAnswerToSingleSelect = false;

    if (this.isEditForm) {
      if (this._inquiryForm) {
        this.handleAddingShortTextQuestionForm(shortTextQuestion);
      } else {
        this._inquiryForm = this.formBuilder.group<QuestionsForm>({
          [InquiryFormName.INQUIRY_NAME]: this.formBuilder.control<string>(inquiry ? inquiry.name : '', Validators.required),
          [InquiryFormName.QUESTIONS]: this.formBuilder.array([])
        });
        this.handleAddingShortTextQuestionForm(shortTextQuestion);
      }
    } else {
      this.handleAddingShortTextQuestionForm(shortTextQuestion);
    }
  }

  private handleAddingShortTextQuestionForm(shortTextQuestion?: ShortTextQuestion): FormArray {
    const questions: FormArray = this.inquiryForm.get(InquiryFormName.QUESTIONS) as FormArray;
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
    this.countQuestionControls(questions);
    return questions;
  }

  protected addMultiSelectForm(multiselectQuestion?: MultiselectQuestion, inquiry?: Inquiry) {
    this.isAnswerToSingleSelect = false;
    this.isAnswerToMultiSelect = true;
    this.lastIDquestionsArrayReverse = 0;

    if (this.isEditForm) {
      if (this._inquiryForm) {
        this.handleAddMultiSelectForm(multiselectQuestion);
      } else {
        this._inquiryForm = this.formBuilder.group<QuestionsForm>({
          [InquiryFormName.INQUIRY_NAME]: this.formBuilder.control<string>(inquiry ? inquiry.name : '', Validators.required),
          [InquiryFormName.QUESTIONS]: this.formBuilder.array([])
        });
        this.handleAddMultiSelectForm(multiselectQuestion);
      }
    } else {
      const questions: FormArray = this.inquiryForm.get(InquiryFormName.QUESTIONS) as FormArray;
      const answers: FormArray = this.formBuilder.array([this.formBuilder.control(''), this.formBuilder.control('')]);

      questions.push(
        this.formBuilder.group<MultiSelectQuestionForm>({
          [MultiSelectQuestionFormName.QUESTION]: this.formBuilder.control<string>('', Validators.required),
          [MultiSelectQuestionFormName.ID]: this.formBuilder.control<string>((questions.controls.length + 1).toString()),
          [TypeQuestion.TYPE]: this.formBuilder.control<QuestionType.MULTISELECT>(QuestionType.MULTISELECT),
          [MultiSelectQuestionFormName.ANSWERS]: answers
        })
      );
      this.countQuestionControls(questions);
    }
  }

  private handleAddMultiSelectForm(multiselectQuestion?: MultiselectQuestion): FormArray {
    const answerFormArray: FormArray = this.formBuilder.array([], { validators: [this.validatorSelectForm()] });

    if (!multiselectQuestion) {
      answerFormArray.push(this.formBuilder.control('', Validators.required));
      answerFormArray.push(this.formBuilder.control('', Validators.required));
    } else {
      multiselectQuestion.answers.forEach((answer: string) => {
        answerFormArray.push(this.formBuilder.control(answer, Validators.required));
      });
    }
    const questions: FormArray = this.inquiryForm.get(InquiryFormName.QUESTIONS) as FormArray;

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
    this.countQuestionControls(questions);
    return questions;
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

  protected addScaleSelectForm(scaleQuestion?: ScaleQuestion, inquiry?: Inquiry) {
    this.isAnswerToMultiSelect = false;
    this.isAnswerToSingleSelect = false;
    this.lastIDquestionsArrayReverse = 0;

    if (this.isEditForm) {
      if (this._inquiryForm) {
        this.handleAddScaleSelectForm(scaleQuestion);
      } else {
        this._inquiryForm = this.formBuilder.group<QuestionsForm>({
          [InquiryFormName.INQUIRY_NAME]: this.formBuilder.control<string>(inquiry ? inquiry.name : '', Validators.required),
          [InquiryFormName.QUESTIONS]: this.formBuilder.array([])
        });
        this.handleAddScaleSelectForm(scaleQuestion);
      }
    } else {
      this.handleAddScaleSelectForm(scaleQuestion);
    }
  }

  private handleAddScaleSelectForm(scaleQuestion?: ScaleQuestion): FormArray {
    const questions: FormArray = this.questionsFormArray;
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
    return questions
  }

  private validateScaleSelectForm(): ValidatorFn {
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

  public addSingleSelectForm(singleSelectQuestion?: SingleSelectQuestion, inquiry?: Inquiry) {
    this.isAnswerToMultiSelect = false;
    this.isAnswerToSingleSelect = true;
    this.lastIDquestionsArrayReverse = 0;

    if (this.isEditForm) {
      if (this._inquiryForm) {
        this.handleAddSingleSelectForm(singleSelectQuestion);
      } else {
        this._inquiryForm = this.formBuilder.group<QuestionsForm>({
          [InquiryFormName.INQUIRY_NAME]: this.formBuilder.control<string>(inquiry ? inquiry.name : '', Validators.required),
          [InquiryFormName.QUESTIONS]: this.formBuilder.array([])
        });
        this.handleAddSingleSelectForm(singleSelectQuestion);
      }
    } else {
      const questions: FormArray = this.inquiryForm.get(InquiryFormName.QUESTIONS) as FormArray;
      const answers: FormArray = this.formBuilder.array([this.formBuilder.control(''), this.formBuilder.control('')]);

      questions.push(
        this.formBuilder.group<SingleSelectQuestionForm>({
          [SingleSelectQuestionFormName.QUESTION]: this.formBuilder.control<string>(
            singleSelectQuestion ? singleSelectQuestion.label : '',
            Validators.required
          ),
          [SingleSelectQuestionFormName.ID]: this.formBuilder.control<string>((questions.controls.length + 1).toString()),
          [TypeQuestion.TYPE]: this.formBuilder.control<QuestionType.SINGLE_SELECT>(QuestionType.SINGLE_SELECT),
          [SingleSelectQuestionFormName.ANSWERS]: answers
        })
      );
      this.countQuestionControls(questions);
    }
  }

  private handleAddSingleSelectForm(singleSelectQuestion?: SingleSelectQuestion): FormArray {
    const answerFormArray: FormArray = this.formBuilder.array([], { validators: [this.validatorSelectForm()] });

    if (!singleSelectQuestion) {
      answerFormArray.push(this.formBuilder.control('', Validators.required));
      answerFormArray.push(this.formBuilder.control('', Validators.required));
    } else {
      singleSelectQuestion.answers.forEach((answer: string) => {
        answerFormArray.push(this.formBuilder.control(answer, Validators.required));
      });
    }
    const questions: FormArray = this.inquiryForm.get(InquiryFormName.QUESTIONS) as FormArray;

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

  protected addAnswerInMultiSelectForm(index: number): void {
    const answers = this.questionsFormArray.controls[index].get(MultiSelectQuestionFormName.ANSWERS) as FormArray;
    answers.push(this.formBuilder.control('', Validators.required));
  }

  protected addAnswerInSingleSelectForm(index: number): void {
    const answers = this.questionsFormArray.controls[index].get(SingleSelectQuestionFormName.ANSWERS) as FormArray;
    answers.push(this.formBuilder.control('', Validators.required));
  }

  public saveInquary(): void {
    const inquiryFormQuestionsForm = this._inquiryForm.get('questions') as FormArray;
    if (this._inquiryForm.valid && inquiryFormQuestionsForm.length > 0) {
      const inquiry: Inquiry = InquiryMapper.map(this._inquiryForm);
      this.inquiryService.createInquiry(inquiry);
      if (this.isEditForm) {
        this.inquiryService.deleteInquiry(this.editInquiryID!);
      }
      this.dialogRef.close(true);
    }
  }

  public removeQuestion(index: any): void {
    this.questionsFormArray.removeAt(index);
    this.questionsFormArray;
  }

  public removeAnswer(itemIndex: number, index: number): void {
    const formArray = this.questionsFormArray.controls[index].get('answers') as FormArray;
    if (formArray.length > 2) {
      formArray.removeAt(itemIndex);
    }
  }

  public trackItem(item: AbstractControl): number {
    return item.get('id')?.value;
  }

  private countQuestionControls(questions: FormArray): void {
    const questionsLength = +questions.controls['length'];
    const questionsArray: SingleSelectQuestionForm | MultiSelectQuestionForm[] = [];
    for (let i = 0; i < questionsLength; i++) {
      questionsArray.push(questions.controls[i].value);
    }
    const questionsArrayReverse = questionsArray?.reverse();
    const lastIDquestionsArrayReverse = questionsArrayReverse[0]?.id;
    this.lastIDquestionsArrayReverse = +lastIDquestionsArrayReverse;
  }

  public get inquiryForm(): FormGroup {
    return this._inquiryForm;
  }

  public get inquiryFormName(): typeof InquiryFormName {
    return InquiryFormName;
  }

  public get questionsFormArray(): FormArray {
    return this.inquiryForm.get(InquiryFormName.QUESTIONS) as FormArray;
  }

  public get shortTextQuestionFormName(): typeof ShortTextQuestionFormName {
    return ShortTextQuestionFormName;
  }

  public get questionType(): typeof QuestionType {
    return QuestionType;
  }
}
