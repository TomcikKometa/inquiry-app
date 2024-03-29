import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Inquiry } from '../../../@models/inquiry';
import { v4 as uuidv4 } from 'uuid';
import { MultiSingleInquiryAnswer, MultiselectQuestion, Question, SingleSelectQuestion } from '../../../@models/question';
import { QuestionType } from '../../../@enums/question-type';
import { ScaleAnswerComponent } from '../../../features/user-panel/components/scale-answer/scale-answer.component';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private inquiries: BehaviorSubject<Inquiry[]> = new BehaviorSubject<Inquiry[]>([]);
  public get inquiries$(): Observable<Inquiry[]> {
    return this.inquiries.asObservable();
  }
  constructor() {
    this.getAllInquiry();
  }

  public createInquiry(inquiry: Inquiry): void {
    inquiry.questions.forEach((question: Question) => {
      if (question.type === QuestionType.MULTISELECT) {
        (question as MultiselectQuestion).answers.forEach((answer: MultiSingleInquiryAnswer) => {
          answer.id = uuidv4();
          answer.isSelected = false;
        });
      }
      if (question.type === QuestionType.SINGLE_SELECT) {
        (question as SingleSelectQuestion).answers.forEach((answer: MultiSingleInquiryAnswer) => {
          answer.id = uuidv4();
          answer.isSelected = false;
        });
      }
    });

    const id: string = uuidv4();
    inquiry.id = id;
    localStorage.setItem(id, JSON.stringify(inquiry));
    this.getAllInquiry();
  }

  public deleteInquiry(id: string): void {
    localStorage.removeItem(id);
    this.getAllInquiry();
  }

  public getInqiryById(id: string): Observable<Inquiry> {
    const jsonInquiry: string | null = localStorage.getItem(id);
    if (!jsonInquiry) {
      return throwError(() => new Error('Inquiry not found'));
    } else {
      return of(JSON.parse(jsonInquiry));
    }
  }

  public getAllInquiry(): void {
    const objectKyes: string[] = Object.keys(JSON.parse(JSON.stringify(localStorage)));
    const inquiriesArray: any[] = [];

    objectKyes.forEach((key: string) => {
      const changedToObjects = JSON.parse(localStorage.getItem(key)!);
      inquiriesArray.push(changedToObjects);
    });
    this.inquiries.next(inquiriesArray);
  }
}
