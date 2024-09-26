import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { InquiryQuestionsFormName, SingleSelectQuestionFormName, TypeQuestion } from '../inquiry-form/@enum/form-enum';
import { QuestionType } from '../../../../@enums/question-type';

@Component({
  selector: 'inq-single-select',
  standalone: true,
  imports: [MatCheckboxModule, MatRadioModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.css'
})
export class SingleSelectComponent {
  protected form!: FormGroup;
  protected answer: string = '';
  protected isViewed: boolean = false;

  @Input({ required: true }) public itemIndex!: number;
  @Input({ required: true }) public item!: AbstractControl;
  @Output() public removeAnswerEvent: EventEmitter<number> = new EventEmitter();
  @Output() public removeQuestionEvent: EventEmitter<number> = new EventEmitter();

  private readonly rootFormGroup: FormGroupDirective = inject(FormGroupDirective);

  public ngOnInit() {
    this.form = this.rootFormGroup.control;
    if (this.item.get(TypeQuestion.TYPE)?.value === QuestionType.SINGLE_SELECT) {
      if (this.itemIndex + 1 === +this.item.get(SingleSelectQuestionFormName.ID)?.value) {
        this.isViewed = true;
      }
    }
  }

  protected removeAnswerAtForm(itemIndex: number): void {
    this.removeAnswerEvent.emit(itemIndex);
  }

  protected removeQuestion(): void {
    this.removeQuestionEvent.emit(this.itemIndex);
  }

  protected get answersFormArray(): FormArray {
    return this.item.get(SingleSelectQuestionFormName.ANSWERS) as FormArray;
  }

  protected get singleSelectQuestionFormName(): typeof SingleSelectQuestionFormName {
    return SingleSelectQuestionFormName;
  }

  protected get inquiryFormName(): typeof InquiryQuestionsFormName {
    return InquiryQuestionsFormName;
  }
}
