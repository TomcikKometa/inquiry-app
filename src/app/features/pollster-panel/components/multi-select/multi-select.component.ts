import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InquiryQuestionsFormName, MultiSelectQuestionFormName, TypeQuestion } from '../inquiry-form/@enum/form-enum';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QuestionType } from '../../../../@enums/question-type';
import { MultiSelectAnswerFormName } from '../../../user-panel/components/inquiry-form-to-fill/ingiry-form-to-fill-service/@enums/inquiry-form-to-fill-enums';

@Component({
  selector: 'inq-multi-select',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css'
})
export class MultiSelectComponent implements OnInit {
  public form!: FormGroup;
  protected isViewed: boolean = false;
  protected isEmptyQuestion: boolean = false;
  protected isEditedControl: boolean = false;

  @Input({ required: true }) public itemIndex!: number;
  @Input({ required: true }) public item!: AbstractControl;
  @Output() public addAnswerEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public removeAnswerEvent: EventEmitter<number> = new EventEmitter();
  @Output() public removeQuestionEvent: EventEmitter<number> = new EventEmitter();

  private readonly rootFormGroup: FormGroupDirective = inject(FormGroupDirective);

  public ngOnInit() {
    this.form = this.rootFormGroup.control;
    if (this.item.get(TypeQuestion.TYPE)?.value === QuestionType.MULTISELECT) {
      if (this.itemIndex + 1 === +this.item.get(MultiSelectQuestionFormName.ID)?.value){
        this.isViewed = true;
      } 
      if (this.item.get(MultiSelectQuestionFormName.ANSWERS)?.get('0')?.value) {
        this.isEditedControl = true;
      }
      if (!this.item.get(MultiSelectQuestionFormName.ANSWERS)?.get('0')?.value) {
        this.isEmptyQuestion = true;
      }
    }
  }

  protected removeQuestion(): void {
    this.removeQuestionEvent.emit(this.itemIndex);
  }

  protected addAnswerInItem(): void {
    this.addAnswerEvent.emit(true);
  }

  protected removeAnswerAtForm(itemIndex: number): void {
    this.removeAnswerEvent.emit(itemIndex);
  }

  protected get questionName(): string {
    return this.item.get('question')?.value;
  }

  public get multiSelectQuestionFormName(): typeof MultiSelectQuestionFormName {
    return MultiSelectQuestionFormName;
  }

  public get inquiryFormName(): typeof InquiryQuestionsFormName {
    return InquiryQuestionsFormName;
  }

  public get answersFormArray(): FormArray {
    return this.item.get(MultiSelectQuestionFormName.ANSWERS) as FormArray;
  }

  public get multiSelectAnswerFormName(): typeof MultiSelectAnswerFormName {
    return MultiSelectAnswerFormName;
  }
}
