import { Component, Input, inject } from '@angular/core';
import { FormGroup, AbstractControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { QuestionType } from '../../../../@enums/question-type';
import { ScaleSelectAnswerFormName, InquiryAnswersFormName } from '../@enums/inquiry-form-to-fill-enums';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'inq-scale-answer',
  standalone: true,
  imports: [MatSliderModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './scale-answer.component.html',
  styleUrl: './scale-answer.component.css',
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: '1' })),
      state('out', style({ opacity: '0' })),
      transition('* => *', [animate(1000)])
    ])
  ]
})
export class ScaleAnswerComponent {
  protected form!: FormGroup;
  protected isViewed: boolean = false;
  protected minSteperValue: number = 0;
  protected maxSteperValue: number = 0;
  protected stepSizeValue: number = 0;
  protected isChosenMaxValue: boolean = false;
  protected isDisbaled = true;
  protected stateSteper = '';
  protected sliderValue = 0;
  protected  isAnswer: boolean = false;

  @Input({ required: true }) public itemIndex!: number;
  @Input({ required: true }) public item!: AbstractControl;

  private readonly rootFormGroup: FormGroupDirective = inject(FormGroupDirective);
  private readonly _destroy: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
    const formGroup: FormGroup = this.item as FormGroup;
    if (formGroup.controls['type'].value === QuestionType.SCALE) {
      this.isViewed = true;
      this.item ? this.prepareSliderValues() : 0;
    }
    this.item
      .get('answer')
      ?.valueChanges.pipe(takeUntil(this._destroy))
      .subscribe((answer: number) => {
        this.isChosenMaxValue = answer === this.item.get('maxValue')?.value;
        this.sliderValue = answer;
      });
  }

  private prepareSliderValues(): void {
    this.minSteperValue = this.item.get('minValue')?.value;
    this.maxSteperValue = this.item.get('maxValue')?.value;
    this.stepSizeValue = this.item.get('stepSize')?.value;
  }

  protected invisibleSpan() {
      this.isDisbaled = false;
      this.stateSteper = 'out';
      this.isAnswer = true;
  }

  protected get scaleSelectAnswerFormName(): typeof ScaleSelectAnswerFormName {
    return ScaleSelectAnswerFormName;
  }

  protected get inquiryAnswersFormName(): typeof InquiryAnswersFormName {
    return InquiryAnswersFormName;
  }

  protected get questionLabel(): string {
    return this.item.get(ScaleSelectAnswerFormName.QUESTION)?.value;
  }

  protected get formItem(): FormGroup {
    return this.item as FormGroup;
  }
}
