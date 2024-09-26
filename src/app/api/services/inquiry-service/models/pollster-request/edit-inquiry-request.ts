import { Question } from "../../../../../models/question";


export interface EditInquiryRequest {
    id:number;
    name:string;
    questions:Question[]
}