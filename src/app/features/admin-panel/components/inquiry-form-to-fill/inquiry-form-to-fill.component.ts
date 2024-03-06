import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { InquiryService } from '../../../../@api/services/inquiry-service/inquiry.service';
import { first } from 'rxjs';
import { Inquiry } from '../../../../@models/inquiry';
import { InquiryFormToFillServiceService } from './ingiry-form-to-fill-service/inquiry-form-to-fill-service.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'inq-inquiry-form-to-fill',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatFormFieldModule,MatInputModule],
  providers:[InquiryFormToFillServiceService],
  templateUrl: './inquiry-form-to-fill.component.html',
  styleUrl: './inquiry-form-to-fill.component.css'
})
export class InquiryFormToFillComponent implements OnInit {
  protected inquiry!: Inquiry;
  protected formGroup!:FormGroup;

  private readonly inquiryID: string = inject(MAT_DIALOG_DATA);
  private readonly inquiryService: InquiryService = inject(InquiryService);
  private readonly inquiryFormService: InquiryFormToFillServiceService = inject(InquiryFormToFillServiceService);

  public ngOnInit(): void {
    this.inquiryService.getInqiryById(this.inquiryID).pipe(first()).subscribe((inquiry: Inquiry) => {
      this.inquiry = inquiry,
      this.formGroup = new FormGroup({answers:this.inquiryFormService.createFormToFill(inquiry)})
    });
  }


}
