import { FormArray, FormControl } from '@angular/forms';
import { QuestionType } from '../../../../@enums/question-type';
import {
  InquiryAnswersFormName,
  MultiSelectAnswerFormName,
  ScaleSelectAnswerFormName,
  ShortTextQuestionAnswerFormName,
  SingleSelectAnswerFormName
} from '../@enums/inquiry-form-to-fill-enums';

export interface AnswersForm {
  [InquiryAnswersFormName.ANSWERS]: FormArray;
}

export interface MultiSelectAnswerForm {
  [MultiSelectAnswerFormName.QUESTION]: FormControl<string>;
  [MultiSelectAnswerFormName.TYPE]: FormControl<QuestionType.MULTISELECT>;
  [MultiSelectAnswerFormName.ANSWERS]: FormArray;
}

export interface SingleSelectAnswerForm {
  [SingleSelectAnswerFormName.QUESTION]: FormControl<string>;
  [SingleSelectAnswerFormName.TYPE]: FormControl<QuestionType.SINGLE_SELECT>;
  [SingleSelectAnswerFormName.ANSWERS]: FormArray;
  [SingleSelectAnswerFormName.SELECTED_ANSWER]: FormControl<string>;
}

export interface ShortTextQuestionAnswerForm {
  [ShortTextQuestionAnswerFormName.QUESTION]: FormControl<string>;
  [ShortTextQuestionAnswerFormName.TYPE]: FormControl<QuestionType.SHORT_TEXT>;
  [ShortTextQuestionAnswerFormName.ANSWER]: FormControl<string>;
}

export interface ScaleSelectAnswerForm {
  [ScaleSelectAnswerFormName.QUESTION]: FormControl<string>;
  [ScaleSelectAnswerFormName.TYPE]: FormControl<QuestionType.SCALE>;
  [ScaleSelectAnswerFormName.ANSWER]: FormControl<number>;
  [ScaleSelectAnswerFormName.MAX_VALUE]: FormControl<number>;
  [ScaleSelectAnswerFormName.MIN_VALUE]: FormControl<number>;
  [ScaleSelectAnswerFormName.STEP_SIZE]: FormControl<number>;
}

export interface SingleSelectFormCheckobox {
  [SingleSelectAnswerFormName.ID]: FormControl<string>;
  [SingleSelectAnswerFormName.LABEL]: FormControl<string>;
}

export interface MultiSelectFormRadioButton {
  [MultiSelectAnswerFormName.ID]: FormControl<string>;
  [MultiSelectAnswerFormName.LABEL]: FormControl<string>;
}
