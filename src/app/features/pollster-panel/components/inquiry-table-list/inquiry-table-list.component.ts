import { Component, DestroyRef, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { map } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InquiryApiService } from '../../../../api/services/inquiry-service/inquiry-api.service';
import { ResponseUser } from '../../../../core/services/token-enums';
import { Inquiry } from '../../../../models/inquiry';

interface InquiryDataSource {
  name: string;
  id: number;
}

@Component({
  selector: 'inq-inquiry-table-list-pollster',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './inquiry-table-list.component.html',
  styleUrl: './inquiry-table-list.component.css'
})
export class InquiryTableListPollsterComponent implements OnInit {
  @Output() public editInquiryEvent: EventEmitter<string> = new EventEmitter();
  @Output() public fillInquiryEvent: EventEmitter<string> = new EventEmitter();
  @Output() public deleteInquiryEvent: EventEmitter<string> = new EventEmitter();

  protected displayedColumns: string[] = ['name', 'id', 'action'];
  protected dataSource!: MatTableDataSource<InquiryDataSource, MatPaginator>;
  protected sessionStorageUser: string = '';

  private readonly inquiryService: InquiryApiService = inject(InquiryApiService);
  private readonly destroyReference: DestroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.sessionStorageUser = window.sessionStorage.getItem(ResponseUser.TOKEN_KEY)!;

    this.inquiryService.inquiries$
      .pipe(
        takeUntilDestroyed(this.destroyReference),
        map((inquiries: Inquiry[]) => {
          return inquiries.map((inquiry: Inquiry) => {
            return {
              name: inquiry.name,
              id: inquiry.id!
            } as InquiryDataSource;
          });
        })
      )
      .subscribe((dataSource: InquiryDataSource[]) => {
        this.dataSource = new MatTableDataSource(dataSource);
      });
  }

  protected deleteInquiry(id: number, name: string ) {
    this.inquiryService.deleteInquiry(id);
    this.deleteInquiryEvent.emit(name)
  }

  protected editInquiry(id: string) {
    this.editInquiryEvent.emit(id);
  }

  get accountsToken(): typeof ResponseUser {
    return ResponseUser;
  }
}
