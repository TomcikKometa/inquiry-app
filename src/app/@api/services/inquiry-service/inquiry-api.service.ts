import { Injectable } from '@angular/core';
import { InquiryApiInterface } from './inquiry-api-interface';
import { BehaviorSubject, Observable, first, map, switchMap, tap } from 'rxjs';
import { Inquiry } from '../../../@models/inquiry';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from './api-urls';
import { CreateInquiryRequest } from './models/request/create-inquiry-request';
import { GetAllInquiryResponse } from './models/response/get-all-inquiry-response';
import { GetOneInquiryResponse } from './models/response/get-one-inquiry-response';
import { EditInquiryRequest } from './models/request/edit-inquiry-request';
import { ToastrService } from 'ngx-toastr';
import { ToastrServiceMesseges } from '../../../@enums/toastr-messeges';

@Injectable()
export class InquiryApiService implements InquiryApiInterface {
  private inquiries: BehaviorSubject<Inquiry[]> = new BehaviorSubject<Inquiry[]>([]);
  get inquiries$(): Observable<Inquiry[]> {
    return this.inquiries.asObservable();
  }

  constructor(
    private readonly httpClient: HttpClient,
    private readonly toastService: ToastrService
  ) {
    this.getAllInquiry();
  }

  public createInquiry(inquiry: Inquiry): void {
    const createInquiryRequest: CreateInquiryRequest = {
      name: inquiry.name,
      questions: inquiry.questions
    };
    this.httpClient
      .post(ApiUrls.prepareCreateInquiryUrl(), createInquiryRequest)
      .pipe(
        first(),
        switchMap(() => this.fetchInquiryList()),
        tap({
          next: () =>
            this.toastService.success(ToastrServiceMesseges.SAVED_INQUIRY_ANSWER, '', {
              positionClass: 'toast-top-right',
              tapToDismiss: true,
              closeButton: true
            }),
          error: () => this.toastService.error(ToastrServiceMesseges.OPERATION_FAILED, '')
        })
      )
      .subscribe();
  }
  public deleteInquiry(id: number): void {
    this.httpClient
      .delete(ApiUrls.prepareDeleteInquiryUrl(id))
      .pipe(
        first(),
        tap({
          error: () =>
            this.toastService.error(ToastrServiceMesseges.OPERATION_FAILED, '', {
              positionClass: 'toast-top-right',
              tapToDismiss: true,
              closeButton: true
            })
        }),
        switchMap(() => this.fetchInquiryList()),
        tap({
          next: () =>
            this.toastService.success(ToastrServiceMesseges.DELETE, '', {
              positionClass: 'toast-top-right',
              tapToDismiss: true,
              closeButton: true
            })
        })
      )
      .subscribe();
  }
  public getInquiryById(id: number): Observable<Inquiry> {
    return this.httpClient
      .get<GetOneInquiryResponse>(ApiUrls.prepareGetInquryByIdUrl(id))
      .pipe(map((response: GetOneInquiryResponse) => response.inquiry));
  }

  public getAllInquiry(): void {
    this.fetchInquiryList().subscribe();
  }

  private fetchInquiryList(): Observable<GetAllInquiryResponse> {
    return this.httpClient.get<GetAllInquiryResponse>(ApiUrls.prepareGetAllInquiryUrl()).pipe(
      first(),
      tap((value: GetAllInquiryResponse) => this.inquiries.next(value.inquiryList))
    );
  }

  public editInquiry(inquiry: Inquiry): void {
    const editInquiryRequest: EditInquiryRequest = {
      id: inquiry.id!,
      name: inquiry.name,
      questions: inquiry.questions
    };
    this.httpClient
      .patch<void>(ApiUrls.prepareEditInquiryUrl(inquiry.id!), editInquiryRequest)
      .pipe(
        first(),
        switchMap(() => this.fetchInquiryList()),
        tap({
          next: () =>
            this.toastService.success(ToastrServiceMesseges.INQUIRY_HAS_BEEN_EDITED, '', {
              positionClass: 'toast-top-right',
              tapToDismiss: true,
              closeButton: true
            }),
          error: () => this.toastService.error(ToastrServiceMesseges.OPERATION_FAILED, '')
        })
      )
      .subscribe();
  }
}
