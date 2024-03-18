import { Component, Input, OnInit, inject } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { QuestionType } from '../../../../@enums/question-type';
import { InquiryAnswersFormName, ScaleSelectAnswerFormName } from '../@enums/inquiry-form-to-fill-enums';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'inq-singleselect-answer',
  standalone: true,
  imports: [],
  templateUrl: './singleselect-answer.component.html',
  styleUrl: './singleselect-answer.component.css'
})
export class SingleselectAnswerComponent {
}
