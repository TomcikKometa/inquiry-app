import { FormArray, FormControl } from '@angular/forms';
import { QuestionType } from '../../../../../../@enums/question-type';
import { MultiSelectAnswerFormName, ShortTextQuestionAnswerFormName, SingleSelectAnswerFormName } from '../enums/inquiry-form-to-fill-enums';

export interface MultiSelectAnswerForm {
  [MultiSelectAnswerFormName.QUESTION]: FormControl<string>;
  [MultiSelectAnswerFormName.TYPE]: FormControl<QuestionType.MULTISELECT>;
  [MultiSelectAnswerFormName.ANSWERS]: FormArray;
}

export interface SingleSelectAnswerForm {
  [SingleSelectAnswerFormName.QUESTION]: FormControl<string>;
  [SingleSelectAnswerFormName.TYPE]: FormControl<QuestionType.SINGLE_SELECT>;
  [SingleSelectAnswerFormName.ANSWERS]: FormArray;
}

export interface ShortTextQuestionAnswerForm {
  [ShortTextQuestionAnswerFormName.QUESTION]: FormControl<string>;
  [ShortTextQuestionAnswerFormName.TYPE]: FormControl<QuestionType.SHORT_TEXT>;
  [ShortTextQuestionAnswerFormName.ANSWER]: FormArray;
}
