import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'inq-inquiries',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './inquiries.component.html',
  styleUrl: './inquiries.component.css'
})
export class InquiriesComponent {
  protected inquiryDetails = [
    { detail: 'Filled inquiry', data: [] },
    { detail: 'Approved inquiry', data: [] },
    { detail: 'On production', data: [] }
  ];
}
