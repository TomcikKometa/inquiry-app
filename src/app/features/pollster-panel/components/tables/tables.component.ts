import { Component } from '@angular/core';

@Component({
  selector: 'inq-tables',
  standalone: true,
  imports: [],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent {
  inquiryDetails = [
    {detail:'Filled inquiry',data:[]},
    {detail:'Approved inquiry',data:[]},
    {detail:'On production',data:[]},
  ]
}
