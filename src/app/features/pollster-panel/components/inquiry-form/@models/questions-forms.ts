import { FormArray, FormControl } from '@angular/forms';
import {
  InquiryQuestionsFormName,
  MultiSelectQuestionFormName,
  ScaleSelectQuestionFormName,
  ShortTextQuestionFormName,
  SingleSelectQuestionFormName,
  TypeQuestion
} from '../@enum/form-enum';
import { QuestionType } from '../../../../../enums/question-type';

export interface QuestionsForm {
  [InquiryQuestionsFormName.INQUIRY_NAME]: FormControl<string>;
  [InquiryQuestionsFormName.QUESTIONS]: FormArray;
}

export interface ShortTextQuestionForm {
  [ShortTextQuestionFormName.QUESTION]: FormControl<string>;
  [ShortTextQuestionFormName.ANSWER]: FormControl<string>;
  [TypeQuestion.TYPE]: FormControl<QuestionType.SHORT_TEXT>;
  [ShortTextQuestionFormName.ID]: FormControl<string>;
}

export interface SingleSelectQuestionForm {
  [SingleSelectQuestionFormName.ANSWERS]: FormArray<FormControl>;
  [TypeQuestion.TYPE]: FormControl<QuestionType.SINGLE_SELECT>;
  [SingleSelectQuestionFormName.ID]: FormControl<string>;
  [SingleSelectQuestionFormName.QUESTION]: FormControl<string>;
}

export interface MultiSelectQuestionForm {
  [MultiSelectQuestionFormName.QUESTION]: FormControl<string>;
  [MultiSelectQuestionFormName.ANSWERS]: FormArray<FormControl>;
  [MultiSelectQuestionFormName.ID]: FormControl<string>;
  [TypeQuestion.TYPE]: FormControl<QuestionType.MULTISELECT>;
}

export interface ScaleSelectQuestionForm {
  [ScaleSelectQuestionFormName.QUESTION]: FormControl<string>;
  [ScaleSelectQuestionFormName.ID]: FormControl<string>;
  [ScaleSelectQuestionFormName.MAX_VALUE]: FormControl<number>;
  [ScaleSelectQuestionFormName.MIN_VALUE]: FormControl<number>;
  [ScaleSelectQuestionFormName.STEP_SIZE]: FormControl<number>;
  [TypeQuestion.TYPE]: FormControl<QuestionType.SCALE>;
}
