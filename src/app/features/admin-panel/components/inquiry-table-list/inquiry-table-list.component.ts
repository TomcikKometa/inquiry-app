import { Component, DestroyRef, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { InquiryService } from '../../../../@api/services/inquiry-service/inquiry.service';
import { map,  } from 'rxjs';
import { Inquiry } from '../../../../@models/inquiry';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface InquiryDataSource {
  name: string;
  id: string;
}

@Component({
  selector: 'inq-inquiry-table-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './inquiry-table-list.component.html',
  styleUrl: './inquiry-table-list.component.css'
})
export class InquiryTableListComponent implements OnInit {
  @Output() public editInquiryEvent: EventEmitter<string> = new EventEmitter()

  protected displayedColumns: string[] = ['name', 'id', 'action'];
  protected dataSource!: MatTableDataSource<InquiryDataSource, MatPaginator>;
  

  private readonly inquiryService: InquiryService = inject(InquiryService);
  private readonly destroyReference: DestroyRef = inject(DestroyRef);

  public ngOnInit(): void{
    this.inquiryService.inquiries$.pipe(takeUntilDestroyed(this.destroyReference),
      map((inquiries: Inquiry[]) => {return inquiries.map((inquiry: Inquiry) => {
        return {
          name: inquiry.name,
          id: inquiry.id,
        } as InquiryDataSource;
      })}
        
      )
    ).subscribe((dataSource:InquiryDataSource[]) => {
      this.dataSource = new MatTableDataSource(dataSource)
    });
  }

  protected deleteInquiry(id: string) {
    this.inquiryService.deleteInquiry(id);
  }

  protected editInquiry(id:string){
    this.editInquiryEvent.emit(id)
  }
}
