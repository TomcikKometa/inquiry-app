import { Component, DestroyRef, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { map } from 'rxjs';
import { ResponseUser } from '../../../../@core/services/token-enums';
import { Inquiry } from '../../../../models/inquiry';
import { InquiryService } from '../../../../@api/services/inquiry-service/inquiry.service';
import { MatButtonModule } from '@angular/material/button';

interface InquiryDataSource {
  name: string;
  id: number;
}

@Component({
  selector: 'inq-inquiry-table-list-user',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './inquiry-table-list-user.component.html',
  styleUrl: './inquiry-table-list-user.component.css'
})
export class InquiryTableListUserComponent implements OnInit {
  @Output() public editInquiryEvent: EventEmitter<string> = new EventEmitter();
  @Output() public openInquiryFormToFillEvent: EventEmitter<string> = new EventEmitter();

  protected displayedColumns: string[] = ['name', 'id', 'action'];
  protected dataSource!: MatTableDataSource<InquiryDataSource, MatPaginator>;
  sessionStorageUser!: string;

  private readonly inquiryService: InquiryService = inject(InquiryService);
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
              id: inquiry.id
            } as InquiryDataSource;
          });
        })
      )
      .subscribe((dataSource: InquiryDataSource[]) => {
        this.dataSource = new MatTableDataSource(dataSource);
      });
  }

  protected openInquiryFormToFill(id: string): void {
    this.openInquiryFormToFillEvent.emit(id);
  }
}
