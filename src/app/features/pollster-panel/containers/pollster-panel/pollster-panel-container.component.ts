import { registerLocaleData, DatePipe, DATE_PIPE_DEFAULT_OPTIONS } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs";
import { InquiryApiService } from "../../../../api/services/inquiry-service/inquiry-api.service";
import { DIALOG_OPTIONS_FORM } from "../../../../config/form-config";
import { NavigationService } from "../../../../core/services/navigation/navigation.service";
import { ResponseUser } from "../../../../core/services/token-enums";
import { ToastrServiceMesseges } from "../../../../enums/toastr-messeges";
import { Inquiry } from "../../../../models/inquiry";
import { ChartsComponent } from "../../components/charts/charts.component";
import { InquiriesComponent } from "../../components/inquiries/inquiries.component";
import { InquiryFormComponent } from "../../components/inquiry-form/inquiry-form/inquiry-form.component";
import { InquiryTableListPollsterComponent } from "../../components/inquiry-table-list/inquiry-table-list.component";
import { TablesComponent } from "../../components/tables/tables.component";
import localeGb from '@angular/common/locales/en-GB';
registerLocaleData(localeGb);

@Component({
  selector: 'inq-admin-panel-container',
  standalone: true,
  providers: [DatePipe,InquiryApiService],
  imports: [InquiryTableListPollsterComponent, MatButtonModule, MatIconModule, MatCardModule,InquiriesComponent,TablesComponent,ChartsComponent],
  templateUrl: './pollster-panel-container.component.html',
  styleUrl: './pollster-panel-container.component.css'
})
export class PollsterPanelContainerComponent {
  protected sessionStorageUser!: string;
  protected userType!: string;
  protected timeActual!: string;
  protected currentDate: Date = new Date();
  protected currentDateTrasformed:string = '';

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly toastService: ToastrService = inject(ToastrService);
  private readonly navigationService: NavigationService = inject(NavigationService);
  private readonly datePipe: DatePipe = inject(DatePipe);
  private readonly inquiryApiService: InquiryApiService = inject(InquiryApiService);

  public ngOnInit(): void {
    this.clock();
    setInterval(() => this.clock(), 1000);
  }

  private clock(): void {
    this.currentDate.setSeconds(this.currentDate.getSeconds() + 1);
    
    this.timeActual = this.datePipe.transform(this.currentDate, 'HH:mm:ss') as string;
    this.currentDateTrasformed = this.datePipe.transform(this.currentDate, 'fullDate','pl','en-Gb') as string
  }

  protected openSaveInquiryForm(): void{
    const dialogRef = this.dialog.open(InquiryFormComponent, { ...DIALOG_OPTIONS_FORM });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((inquiry: Inquiry) => {
        if (inquiry) {
          this.inquiryApiService.createInquiry(inquiry);
        }
      });
  }

  protected openEditInquiryForm(id:string):void{
    const dialogRef = this.dialog.open(InquiryFormComponent, { data:id, ...DIALOG_OPTIONS_FORM });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((inquiry: Inquiry) => {
        if (inquiry) {
          this.inquiryApiService.editInquiry(inquiry);
        }
      });
  }

  protected logOut(): void {
    this.navigationService.navigateToLogin();
  }

  public showDeleteToastr(name: string) {
    this.toastService.error(ToastrServiceMesseges.DELETE, `Inquiry: ${name}`, {
      positionClass: 'toast-top-right',
      tapToDismiss: true,
      closeButton: true
    });
  }
  get accountsToken(): typeof ResponseUser {
    return ResponseUser;
  }
}
