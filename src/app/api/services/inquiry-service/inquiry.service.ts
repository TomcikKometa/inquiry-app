import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { InquiryApiInterface } from './inquiry-api-interface';
import { QuestionType } from '../../../enums/question-type';
import { Inquiry } from '../../../models/inquiry';
import { Question, MultiSelectQuestion, SingleSelectAnswer, SingleSelectQuestion } from '../../../models/question';

@Injectable()
export class InquiryService implements InquiryApiInterface{
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
        (question as MultiSelectQuestion).answers.forEach((answer: SingleSelectAnswer) => {
          answer.id = uuidv4();
        });
      }
      if (question.type === QuestionType.SINGLE_SELECT) {
        (question as SingleSelectQuestion).answers.forEach((answer: SingleSelectAnswer) => {
          answer.id = uuidv4();
        });
      }
    });

    const id: string = uuidv4();
    localStorage.setItem(id, JSON.stringify(inquiry));
    this.getAllInquiry();
  }

  public deleteInquiry(id: number): void {
    localStorage.removeItem(id.toString());
    this.getAllInquiry();
  }

  public getInquiryById(id: number): Observable<Inquiry> {
    const jsonInquiry: string | null = localStorage.getItem(id.toString());
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
