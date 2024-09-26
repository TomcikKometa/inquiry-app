import { QuestionType } from '../enums/question-type';

export interface Question {
  label: string;
  type: QuestionType;
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
  answers: SingleSelectAnswer[];
}
export interface MultiSelectQuestion extends Question {
  answers: MultiSelectAnswer[];
}
export interface SingleSelectAnswer {
  answer: string;
  id?:string;
}

export interface MultiSelectAnswer {
  answer: string;
  id?:string;
}

export interface SingleSelectAnswerForm {
  label: string;
  id?:string;
}