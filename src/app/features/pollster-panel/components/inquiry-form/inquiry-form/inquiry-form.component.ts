import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormArray, NonNullableFormBuilder, AbstractControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { InquiryQuestionsFormName, MultiSelectQuestionFormName, SingleSelectQuestionFormName, TypeQuestion } from '../@enum/form-enum';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { MultiSelectComponent } from '../../multi-select/multi-select.component';
import { ToastrServiceMesseges } from '../../../../../@enums/toastr-messeges';
import { ButtonAddAnswerComponent } from '../../../../shared-components/button-add-answer/button-add-answer.component';
import { InquiryFormServiceService } from '../inquiry-form-service/inquiry-form-service.service';
import { InquirySavedInfo } from '../../../containers/@models/pollster-containers-models';

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
  providers: [ToastrService, InquiryFormServiceService],
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
  protected readonly editInquiryID: number | undefined = inject(MAT_DIALOG_DATA);
  private readonly toastService: ToastrService = inject(ToastrService);
  public readonly inquiryFormServiceService: InquiryFormServiceService = inject(InquiryFormServiceService);

  public ngOnInit(): void {
    this._inquiryForm = this.inquiryFormServiceService._inquiryForm;
    if (!this.editInquiryID) {
      this.isEditForm = false;
    } else {
      this.isEditForm = true;
      this.inquiryService
        .getInquiryById(this.editInquiryID)
        .pipe(first())
        .subscribe((inquiry: Inquiry) => {
          this.inquiryFormServiceService.fillEditForm(inquiry);
        });
    }
  }

  protected addShortTextQuestionForm(): void {
    this.isAnswerToMultiSelect = false;
    this.isAnswerToSingleSelect = false;
    this.inquiryFormServiceService.addShortTextQuestionForm();
  }

  protected addMultiSelectForm(): void {
    this.isAnswerToSingleSelect = false;
    this.isAnswerToMultiSelect = true;
    this.inquiryFormServiceService.addMultiSelectForm();
    this.countQuestionControls();
  }

  protected addScaleSelectForm(): void {
    this.isAnswerToMultiSelect = false;
    this.isAnswerToSingleSelect = false;
    this.lastIDquestionsArrayReverse = 0;
    this.inquiryFormServiceService.addScaleSelectForm();
  }

  protected addSingleSelectForm(): void {
    this.isAnswerToMultiSelect = false;
    this.isAnswerToSingleSelect = true;
    this.lastIDquestionsArrayReverse = 0;
    this.inquiryFormServiceService.addSingleSelectForm();
    this.countQuestionControls();
  }

  protected addAnswerInSelectForm(index: number, answerType: string): void {
    const answersMulti = this.questionsFormArray.controls[index].get(MultiSelectQuestionFormName.ANSWERS) as FormArray;
    const answersSelect = this.questionsFormArray.controls[index].get(SingleSelectQuestionFormName.ANSWERS) as FormArray;
    answerType === 'multiSelect'
      ? answersMulti.push(this.formBuilder.control('', Validators.required))
      : answersSelect.push(this.formBuilder.control('', Validators.required));
  }

  protected saveInquary(): void {
    const inquiryFormQuestionsForm = this._inquiryForm.get('questions') as FormArray;
    if (this._inquiryForm.valid && inquiryFormQuestionsForm.length > 0) {
      const inquiry: Inquiry = InquiryMapper.map(this._inquiryForm);
      this.inquiryService.createInquiry(inquiry);
      if (this.isEditForm) {
        this.inquiryService.deleteInquiry(this.editInquiryID!);
      }
      const inquirySavedInfo: InquirySavedInfo = {
        isSaved: true,
        inquiryName: this.inquiryForm.get('inquiryName')?.value
      };
      this.dialogRef.close(inquirySavedInfo);
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

  protected countQuestionControls() {
    const arrayControl = this.inquiryForm.get('questions') as FormArray;
    this.lastIDquestionsArrayReverse = arrayControl.length;
  }

  protected get inquiryForm(): FormGroup {
    return this._inquiryForm;
  }

  protected get inquiryFormName(): typeof InquiryQuestionsFormName {
    return InquiryQuestionsFormName;
  }

  protected get questionsFormArray(): FormArray {
    return this.inquiryForm.get(InquiryQuestionsFormName.QUESTIONS) as FormArray;
  }

  protected get questionType(): typeof QuestionType {
    return QuestionType;
  }

  protected get typeQuestion(): typeof TypeQuestion {
    return TypeQuestion;
  }
}
