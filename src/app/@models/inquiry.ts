import { Question } from "./question";

export interface Inquiry {
    name:string;
    id?:string;
    questions: Question[];
}