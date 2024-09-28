import { Component } from '@angular/core';

@Component({
  selector: 'inq-inquiries',
  standalone: true,
  imports: [],
  templateUrl: './inquiries.component.html',
  styleUrl: './inquiries.component.css'
})
export class InquiriesComponent {

  inquiryDetails = [
    {detail:'Filled inquiry',data:[]},
    {detail:'Approved inquiry',data:[]},
    {detail:'On production',data:[]},
  ]

  protected userDatailList = [
    { id: 1, text: 'Profile' },
    { id: 2, text: 'Settings' }
  ];
}
