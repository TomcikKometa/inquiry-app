import { QuestionType } from '../@enums/question-type';

export interface Question {
  label: string;
  type: QuestionType;
}

export interface MultiselectQuestion extends Question {
  answers: MultiSingleInquiryAnswer[];
}

export interface ScaleQuestion extends Question {
  stepSize: number;
  max: number;
  min: number;
}

export interface ShortTextQuestion extends Question {
  answer: string;
}

export interface SingleSelectQuestion extends Question {
  answers: MultiSingleInquiryAnswer[];
}

export interface MultiSingleInquiryAnswer {
  answer: string;
  id?:string;
  isSelected?:boolean;
}
