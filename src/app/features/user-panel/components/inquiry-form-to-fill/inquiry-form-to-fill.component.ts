import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InquiryService } from '../../../../@api/services/inquiry-service/inquiry.service';
import { first } from 'rxjs';
import { Inquiry } from '../../../../@models/inquiry';
import { InquiryFormToFillServiceService } from './ingiry-form-to-fill-service/inquiry-form-to-fill-service.service';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MultiselectAnswerComponent } from '../multiselect-answer/multiselect-answer.component';
import { ScaleAnswerComponent } from '../scale-answer/scale-answer.component';
import { ShortquestionAnswerComponent } from '../shortquestion-answer/shortquestion-answer.component';
import { SingleselectAnswerComponent } from '../singleselect-answer/singleselect-answer.component';
import { MatButtonModule } from '@angular/material/button';
import { ButtonAddAnswerComponent } from '../../../shared-components/button-add-answer/button-add-answer.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'inq-inquiry-form-to-fill',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MultiselectAnswerComponent,
    ScaleAnswerComponent,
    ShortquestionAnswerComponent,
    SingleselectAnswerComponent,
    MatDialogModule,
    MatButtonModule,
    ButtonAddAnswerComponent,
    MatIconModule
  ],
  providers: [InquiryFormToFillServiceService],
  templateUrl: './inquiry-form-to-fill.component.html',
  styleUrl: './inquiry-form-to-fill.component.css'
})
export class InquiryFormToFillComponent implements OnInit {
  protected inquiry!: Inquiry;
  protected formGroup!: FormGroup;

  private readonly inquiryID: string = inject(MAT_DIALOG_DATA);
  private readonly inquiryService: InquiryService = inject(InquiryService);
  private readonly inquiryFormService: InquiryFormToFillServiceService = inject(InquiryFormToFillServiceService);

  public ngOnInit(): void {
    this.inquiryService
      .getInqiryById(this.inquiryID)
      .pipe(first())
      .subscribe((inquiry: Inquiry) => {
        (this.inquiry = inquiry), (this.formGroup = new FormGroup({ answers: this.inquiryFormService.createFormToFill(inquiry) }));
      });
  }

  protected get formArrayControls(): FormArray {
    return this.formGroup.controls['answers'] as FormArray;
  }

  protected saveAnswerForm(){
    console.log('saved',this.formGroup);
  }
}
