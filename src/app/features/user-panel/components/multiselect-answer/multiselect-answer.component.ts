import { Component, EventEmitter, Input, OnChanges, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  InquiryAnswersFormName,
  MultiSelectAnswerFormName
} from '../@enums/inquiry-form-to-fill-enums';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QuestionType } from '../../../../@enums/question-type';
import { TypeQuestion } from '../../../pollster-panel/components/inquiry-form/@enum/form-enum';
@Component({
  selector: 'inq-multiselect-answer',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, FormsModule],
  templateUrl: './multiselect-answer.component.html',
  styleUrl: './multiselect-answer.component.css'
})
export class MultiselectAnswerComponent implements OnInit {
  public form!: FormGroup;
  protected isViewed:boolean = false;
  protected multiselectAnswerFormName: typeof MultiSelectAnswerFormName = MultiSelectAnswerFormName;

  @Input({ required: true }) public item!: AbstractControl;
  @Input({ required: true }) public indexItem!: number;
  private readonly rootFormGroup: FormGroupDirective = inject(FormGroupDirective);

  public ngOnInit(): void {
    this.form = this.rootFormGroup.control;
    if (this.item.get(TypeQuestion.TYPE)?.value === QuestionType.MULTISELECT) {
        this.isViewed = true;
    }
  };

  protected get questionName(): string {
    return this.item.get('question')?.value;
  }

  public get inquiryFormName(): typeof InquiryAnswersFormName {
    return InquiryAnswersFormName;
  }

  public get multiSelectAnswerFormName(): typeof MultiSelectAnswerFormName {
    return MultiSelectAnswerFormName;
  }

  public get answersFormArray(): FormArray {
    return this.item.get(MultiSelectAnswerFormName.ANSWERS) as FormArray;
  }
}
