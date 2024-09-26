import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import { InquiryQuestionsFormName, ScaleSelectQuestionFormName } from '../inquiry-form/@enum/form-enum';
import { QuestionType } from '../../../../enums/question-type';

@Component({
  selector: 'inq-scale-select',
  standalone: true,
  imports: [MatSliderModule,MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './scale-select.component.html',
  styleUrl: './scale-select.component.css'
})
export class ScaleSelectComponent {
  protected form!:FormGroup;
  protected isViewed = false;
    @Input({ required: true }) public itemIndex!: number;
    @Input({ required: true }) public item!: AbstractControl;
    @Output() public removeQuestionEvent: EventEmitter<number> = new EventEmitter();
  
    private readonly rootFormGroup: FormGroupDirective = inject(FormGroupDirective);
  
    public ngOnInit() {
      this.form = this.rootFormGroup.control;
      const formGroup:FormGroup = this.item as FormGroup;
      if(formGroup.controls['type'].value === QuestionType.SCALE){
        if((this.itemIndex + 1 )=== +(formGroup.controls['id'].value)){
          this.isViewed = true;
        }
      }
    }

    protected removeQuestion(): void {
      this.removeQuestionEvent.emit(this.itemIndex);
    }

    public get inquiryFormName(): typeof InquiryQuestionsFormName {
      return InquiryQuestionsFormName;
    }

    public get scaleSelectQuestionFormName() : typeof ScaleSelectQuestionFormName {
      return ScaleSelectQuestionFormName;
    }
}
