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
import { Inquiry } from '../../../../../@models/inquiry';
import { QuestionType } from '../../../../../@enums/question-type';
import { InquiryMapper } from '../../../../../@api/services/mapper/inquiry-mapper';
import { InquiryService } from '../../../../../@api/services/inquiry-service/inquiry.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { MultiselectQuestion, Question, ScaleQuestion, ShortTextQuestion, SingleSelectQuestion } from '../../../../../@models/question';
import { MultiSelectComponent } from '../../multi-select/multi-select.component';
import { ToastrServiceMesseges } from '../../../../../@enums/toastr-messeges';
import { ButtonAddAnswerComponent } from '../../../../shared-components/button-add-answer/button-add-answer.component';
import { InquiryFormServiceService } from '../inquiry-form-service/inquiry-form-service.service';

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
  private readonly toastService: ToastrService = inject(ToastrService);
  public readonly inquiryFormServiceService: InquiryFormServiceService = inject(InquiryFormServiceService);

  public ngOnInit(): void {
    if (!this.editInquiryID) {
      this.isEditForm = false;
      this._inquiryForm = this.createNewForm();
    } else {
      this.isEditForm = true;
      this.inquiryService
        .getInqiryById(this.editInquiryID)
        .pipe(first())
        .subscribe((inquiry: Inquiry) => {
          this.createEditForm(inquiry);
        });
    }
  }

  private createEditForm(inquiry?: Inquiry): void {
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

  protected addShortTextQuestionForm(shortTextQuestion?: ShortTextQuestion, inquiry?: Inquiry): void {
    this.isAnswerToMultiSelect = false;
    this.isAnswerToSingleSelect = false;
    if (this.isEditForm && !this._inquiryForm) {
      this._inquiryForm = this.formBuilder.group<QuestionsForm>({
        [InquiryFormName.INQUIRY_NAME]: this.formBuilder.control<string>(inquiry ? inquiry.name : '', Validators.required),
        [InquiryFormName.QUESTIONS]: this.formBuilder.array([])
      });
    }
    InquiryFormServiceService.addShortTextQuestionForm(this._inquiryForm, shortTextQuestion) as FormArray;
  }

  protected addMultiSelectForm(multiselectQuestion?: MultiselectQuestion, inquiry?: Inquiry) {
    this.isAnswerToSingleSelect = false;
    this.isAnswerToMultiSelect = true;

    if (this.isEditForm && !this._inquiryForm) {
      this._inquiryForm = this.formBuilder.group<QuestionsForm>({
        [InquiryFormName.INQUIRY_NAME]: this.formBuilder.control<string>(inquiry ? inquiry.name : '', Validators.required),
        [InquiryFormName.QUESTIONS]: this.formBuilder.array([])
      });
    } 
    InquiryFormServiceService.addMultiSelectForm(this._inquiryForm, multiselectQuestion);
    this.countQuestionControls();
  }

  protected addScaleSelectForm(scaleQuestion?: ScaleQuestion, inquiry?: Inquiry) {
    this.isAnswerToMultiSelect = false;
    this.isAnswerToSingleSelect = false;
    this.lastIDquestionsArrayReverse = 0;

    if (this.isEditForm && !this._inquiryForm) {
      this._inquiryForm = this.formBuilder.group<QuestionsForm>({
        [InquiryFormName.INQUIRY_NAME]: this.formBuilder.control<string>(inquiry ? inquiry.name : '', Validators.required),
        [InquiryFormName.QUESTIONS]: this.formBuilder.array([])
      });
    } 
    InquiryFormServiceService.addScaleSelectForm(this._inquiryForm, scaleQuestion);
  }

  protected addSingleSelectForm(singleSelectQuestion?: SingleSelectQuestion, inquiry?: Inquiry) {
    this.isAnswerToMultiSelect = false;
    this.isAnswerToSingleSelect = true;
    this.lastIDquestionsArrayReverse = 0;

    if (this.isEditForm && !this._inquiryForm) {
      this._inquiryForm = this.formBuilder.group<QuestionsForm>({
        [InquiryFormName.INQUIRY_NAME]: this.formBuilder.control<string>(inquiry ? inquiry.name : '', Validators.required),
        [InquiryFormName.QUESTIONS]: this.formBuilder.array([])
      });
    } 
    InquiryFormServiceService.addSingleSelectForm(this._inquiryForm, singleSelectQuestion);
    this.countQuestionControls();
  }

  protected addAnswerInMultiSelectForm(index: number): void {
    const answers = this.questionsFormArray.controls[index].get(MultiSelectQuestionFormName.ANSWERS) as FormArray;
    answers.push(this.formBuilder.control('', Validators.required));
  }

  protected addAnswerInSingleSelectForm(index: number): void {
    const answers = this.questionsFormArray.controls[index].get(SingleSelectQuestionFormName.ANSWERS) as FormArray;
    answers.push(this.formBuilder.control('', Validators.required));
  }

  protected saveInquary(): void {
    const inquiryFormQuestionsForm = this._inquiryForm.get('questions') as FormArray;
    if (this._inquiryForm.valid && inquiryFormQuestionsForm.length > 0) {
      const inquiry: Inquiry = InquiryMapper.map(this._inquiryForm);
      this.inquiryService.createInquiry(inquiry);
      if (this.isEditForm) {
        this.inquiryService.deleteInquiry(this.editInquiryID!);
      }
      this.dialogRef.close(true);
    } else {
      this.toastService.error(ToastrServiceMesseges.INVALID_FORM, '', {
        positionClass: 'toast-top-right',
        tapToDismiss: true,
        closeButton: true
      });
    }
  }

  protected removeQuestion(index: any): void {
    this.questionsFormArray.removeAt(index);
    this.questionsFormArray;
  }

  protected removeAnswer(itemIndex: number, index: number): void {
    const formArray = this.questionsFormArray.controls[index].get('answers') as FormArray;
    if (formArray.length > 2) {
      formArray.removeAt(itemIndex);
    }
  }

  protected trackItem(item: AbstractControl): number {
    return item.get('id')?.value;
  }

  protected countQuestionControls(){
    const  arrayControl = this.inquiryForm.get('questions') as FormArray;
    this.lastIDquestionsArrayReverse = arrayControl.length;
  }

  protected get inquiryForm(): FormGroup {
    return this._inquiryForm;
  }

  protected get inquiryFormName(): typeof InquiryFormName {
    return InquiryFormName;
  }

  protected get questionsFormArray(): FormArray {
    return this.inquiryForm.get(InquiryFormName.QUESTIONS) as FormArray;
  }

  protected get shortTextQuestionFormName(): typeof ShortTextQuestionFormName {
    return ShortTextQuestionFormName;
  }

  protected get questionType(): typeof QuestionType {
    return QuestionType;
  }

  protected get typeQuestion(): typeof TypeQuestion {
    return TypeQuestion;
  }
}
