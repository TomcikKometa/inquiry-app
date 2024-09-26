import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { InquiryFormToFillServiceService } from './ingiry-form-to-fill-service/inquiry-form-to-fill-service.service';
import { FormArray, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, getLocaleFirstDayOfWeek } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MultiselectAnswerComponent } from '../multiselect-answer/multiselect-answer.component';
import { ScaleAnswerComponent } from '../scale-answer/scale-answer.component';
import { ShortquestionAnswerComponent } from '../shortquestion-answer/shortquestion-answer.component';
import { SingleselectAnswerComponent } from '../singleselect-answer/singleselect-answer.component';
import { MatButtonModule } from '@angular/material/button';
import { ButtonAddAnswerComponent } from '../../../shared-components/button-add-answer/button-add-answer.component';
import { MatIconModule } from '@angular/material/icon';
import { MAT_TABS_CONFIG, MatTabsModule } from '@angular/material/tabs';
import { TabGroupComponent } from '../../../shared-components/tab-group/tab-group.component';
import { TabComponent } from '../../../shared-components/tab/tab.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { Inquiry } from '../../../../models/inquiry';
import { InquiryService } from '../../../../api/services/inquiry-service/inquiry.service';
import { ToastrServiceMesseges } from '../../../../enums/toastr-messeges';

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
    MatTabsModule,
    ButtonAddAnswerComponent,
    MatIconModule,
    TabGroupComponent,
    TabComponent
  ],
  providers: [InquiryFormToFillServiceService, { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } }],
  templateUrl: './inquiry-form-to-fill.component.html',
  styleUrl: './inquiry-form-to-fill.component.css',
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: '1' })),
      state('out', style({ opacity: '0' })),
      state('buttonState', style({ opacity: '0.1' })),
      state('stateSaveButton', style({ opacity: '1' })),
      transition('* => *', [animate(1000)])
    ])
  ]
})
export class InquiryFormToFillComponent implements OnInit, AfterViewInit {
  protected inquiry!: Inquiry;
  protected formGroup!: FormGroup;
  protected formGropMatTab!: FormArray;
  protected tabIndex: number = 0;
  protected state = 'in';
  protected isNoButtonNext = true;
  protected numberOfQuestions :number  = 0;

  isNoButtonSave = false;

  private readonly inquiryID: number = inject(MAT_DIALOG_DATA);
  private readonly inquiryService: InquiryService = inject(InquiryService);
  private readonly inquiryFormService: InquiryFormToFillServiceService = inject(InquiryFormToFillServiceService);
  private readonly ref: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly dialogRef: MatDialogRef<InquiryFormToFillComponent> = inject(MatDialogRef);
  private readonly toastService: ToastrService = inject(ToastrService);

  public ngOnInit(): void {
    this.inquiryService
      .getInquiryById(this.inquiryID)
      .pipe(first())
      .subscribe((inquiry: Inquiry) => {
        (this.inquiry = inquiry), (this.formGroup = new FormGroup({ answers: this.inquiryFormService.createFormToFill(inquiry) }));
      });
    const answersFormArray: FormArray = this.formGroup.get('answers') as FormArray;
    this.numberOfQuestions = answersFormArray.length;
    this.handleViewingButton();
  }

  private handleViewingButton() {
    const form = this.formGroup.controls['answers'] as FormArray;
    if (form.length === 1) {
      this.isNoButtonNext = false;
      this.isNoButtonSave = true;
    }
  }

  public ngAfterViewInit(): void {
    this.ref.detectChanges();
  }

  protected saveAnswerForm() {
    if (this.formGroup.valid) {
      this.dialogRef.close();
      this.toastService.success(ToastrServiceMesseges.SAVED_INQUIRY_ANSWER, '', {
        positionClass: 'toast-top-right',
        tapToDismiss: true,
        closeButton: true,
        timeOut: 4000
      });
    } else {
      this.toastService.error(ToastrServiceMesseges.NOT_CHOICED_ANSWER, '', {
        positionClass: 'toast-top-right',
        tapToDismiss: true,
        closeButton: true,
        timeOut: 2000
      });
    }
  }

  protected changeTabIndex() {
    if (this.formGroup.get('answers')?.get(this.tabIndex.toString())?.status == 'INVALID') {
      this.toastService.error(ToastrServiceMesseges.NOT_CHOICED_ANSWER, '', {
        positionClass: 'toast-top-right',
        tapToDismiss: true,
        closeButton: true,
        timeOut: 2000
      });
    } else {
      this.state = 'out';
      const form = this.formGroup.controls['answers'] as FormArray;
      if (form.length == this.tabIndex + 2) {
        this.isNoButtonNext = false;
        this.isNoButtonSave = true;
      }
      setTimeout(() => {
        (this.state = 'in'), this.tabIndex++;
      }, 800);
    }
  }

  protected get formArrayControls(): FormArray {
    return this.formGroup.controls['answers'] as FormArray;
  }
}
