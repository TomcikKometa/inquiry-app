import { Question } from "./question";

export interface Inquiry {
    name:string;
    id?:number;
    questions: Question[];
}