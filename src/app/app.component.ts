import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InquiryHeaderComponent } from './features/inquiry-header/inquiry-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers:[],
  imports: [RouterOutlet,InquiryHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
