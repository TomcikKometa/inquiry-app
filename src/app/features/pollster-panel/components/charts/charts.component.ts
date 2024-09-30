import { Component } from '@angular/core';

@Component({
  selector: 'inq-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {
  protected inquiryDetails = [
    { detail: 'Filled inquiry', data: [] },
    { detail: 'Approved inquiry', data: [] },
    { detail: 'On production', data: [] }
  ];
}
