import { Injectable } from '@angular/core';
import { InquiryApiInterface } from './inquiry-api-interface';
import { BehaviorSubject, Observable, first, map, tap } from 'rxjs';
import { Inquiry } from '../../../@models/inquiry';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from './api-urls';
import { CreateInquiryRequest } from './models/request/create-inquiry-request';
import { GetAllInquiryResponse } from './models/response/get-all-inquiry-response';
import { GetOneInquiryResponse } from './models/response/get-one-inquiry-response';

@Injectable()
export class InquiryApiService implements InquiryApiInterface {
  private inquiries: BehaviorSubject<Inquiry[]> = new BehaviorSubject<Inquiry[]>([]);
  get inquiries$(): Observable<Inquiry[]> {
    return this.inquiries.asObservable();
  }

  constructor(private readonly httpClient: HttpClient) {
    this.getAllInquiry();
  }

  public createInquiry(inquiry: Inquiry): void {
    const createInquiryRequest: CreateInquiryRequest = {
      name: inquiry.name
    };
    this.httpClient.post(ApiUrls.prepareCreateInquiryUrl(), createInquiryRequest).pipe(first(),tap(() => this.getAllInquiry())).subscribe();
  }
  public deleteInquiry(id: number): void {
    this.httpClient.delete(ApiUrls.prepareDeleteInquiryUrl(id)).pipe(first(),tap(() => this.getAllInquiry())).subscribe();
  }
  public getInquiryById(id: number): Observable<Inquiry> {
    return this.httpClient
      .get<GetOneInquiryResponse>(ApiUrls.prepareGetInquryByIdUrl(id))
      .pipe(map((response: GetOneInquiryResponse) => response.inquiry));
  }

  public getAllInquiry(): void {
    this.httpClient
      .get<GetAllInquiryResponse>(ApiUrls.prepareGetAllInquiryUrl())
      .pipe(first())
      .subscribe((value: GetAllInquiryResponse) => this.inquiries.next(value.inquiryList));
  }
}
