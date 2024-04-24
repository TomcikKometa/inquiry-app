import { Observable } from "rxjs";
import { Inquiry } from "../../../@models/inquiry"

export interface InquiryApiInterface {
    get inquiries$(): Observable<Inquiry[]>
    createInquiry(inquiry: Inquiry):void;
    deleteInquiry(id:number):void;
    getInquiryById(id:number):Observable<Inquiry>;
    getAllInquiry():void;
}