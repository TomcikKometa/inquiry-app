import { Component, DestroyRef, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { first, map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { ResponseUser } from '../../../../core/services/token-enums';
import { Inquiry } from '../../../../models/inquiry';
import { InquiryApiService } from '../../../../api/services/inquiry-service/inquiry-api.service';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_OPTIONS_FORM, DIALOG_OPTIONS_FORM_TO_FILL } from '../../../../config/form-config';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form/inquiry-form.component';
import { InquiryFormToFillComponent } from '../../../user-panel/components/inquiry-form-to-fill/inquiry-form-to-fill.component';

interface InquiryDataSource {
  name: string;
  id: number;
}

@Component({
  selector: 'inq-inquiry-table-edit',
  standalone: true,
  providers:[InquiryApiService],
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './inquiry-table-edit.component.html',
  styleUrl: './inquiry-table-edit.component.css'
})
export class InquiryTableEditComponent implements OnInit {
  @Output() public editInquiryEvent: EventEmitter<string> = new EventEmitter();
  @Output() public openInquiryFormToFillEvent: EventEmitter<string> = new EventEmitter();

  protected displayedColumns: string[] = ['name', 'id', 'action'];
  protected dataSource!: MatTableDataSource<InquiryDataSource, MatPaginator>;
  sessionStorageUser!: string;

  private readonly inquiryService: InquiryApiService = inject(InquiryApiService);
  private readonly destroyReference: DestroyRef = inject(DestroyRef);
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly inquiryApiService: InquiryApiService = inject(InquiryApiService);

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
     const dialogRef =this.dialog.open(InquiryFormToFillComponent, {data:id, ...DIALOG_OPTIONS_FORM_TO_FILL});
      dialogRef
        .afterClosed()
        .pipe(first())
        .subscribe((inquiry: Inquiry) => {
          if (inquiry) {
            this.inquiryApiService.editInquiry(inquiry);
          }
        });
  }
}
