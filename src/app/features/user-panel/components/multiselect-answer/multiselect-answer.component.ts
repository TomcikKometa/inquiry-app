import { Component, Input, OnInit, inject } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MultiSelectQuestionFormName } from '../../../pollster-panel/components/inquiry-form/@enum/form-enum';
import { MultiSelectAnswerFormName } from '../inquiry-form-to-fill/ingiry-form-to-fill-service/enums/inquiry-form-to-fill-enums';

@Component({
  selector: 'inq-multiselect-answer',
  standalone: true,
  imports: [],
  templateUrl: './multiselect-answer.component.html',
  styleUrl: './multiselect-answer.component.css'
})
export class MultiselectAnswerComponent implements OnInit {
  public form!: FormGroup;
  protected multiselectAnswerFormName: typeof MultiSelectAnswerFormName = MultiSelectAnswerFormName;

  @Input({ required: true }) public item!: AbstractControl;

  private readonly rootFormGroup: FormGroupDirective = inject(FormGroupDirective);

  public ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }
}
