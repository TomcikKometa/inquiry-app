import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InquiryQuestionsFormName, ShortTextQuestionFormName, TypeQuestion } from '../inquiry-form/@enum/form-enum';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { QuestionType } from '../../../../enums/question-type';

@Component({
  selector: 'inq-question',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule,FormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {
  public form!: FormGroup;
  protected isViewed:boolean = false;
  @Input({ required: true }) public itemIndex!: number;
  @Input({ required: true }) public item!: AbstractControl;
  @Output() public removeQuestionEvent: EventEmitter<number> = new EventEmitter();

  private readonly rootFormGroup: FormGroupDirective = inject(FormGroupDirective);

  public ngOnInit() {
    this.form = this.rootFormGroup.control;
    if (this.item.get(TypeQuestion.TYPE)?.value === QuestionType.SHORT_TEXT) {
      if (this.itemIndex + 1 === +this.item.get(ShortTextQuestionFormName.ID)?.value) {
        this.isViewed = true;
      }
    }
  }

  protected removeQuestion(): void {
    this.removeQuestionEvent.emit(this.itemIndex);
  }

  protected get shortTextQuestionFormName(): typeof ShortTextQuestionFormName {
    return ShortTextQuestionFormName;
  }

  protected get inquiryFormName(): typeof InquiryQuestionsFormName {
    return InquiryQuestionsFormName;
  }
}
