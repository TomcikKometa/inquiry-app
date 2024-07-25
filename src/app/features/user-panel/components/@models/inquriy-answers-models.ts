import { QuestionType } from '../../../../@enums/question-type';
import { SingleSelectAnswer } from '../../../../@models/question';

export interface Answers {
  [key:string]:Answer
}

export interface Answer {
  type:string;
  question:string;
}

export interface MultiSelectAnswerModel extends Answer {
  answers: MultiSingleInquiryAnswerFormtoFill[];
}

export interface MultiSingleInquiryAnswerFormtoFill {
  id?: string;
  isSelected?: boolean;
}
