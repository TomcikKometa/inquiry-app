import { Component, inject } from '@angular/core';
import { NavigationService } from '../../../../core/services/navigation/navigation.service';

@Component({
  selector: 'inq-tables',
  standalone: true,
  imports: [],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent {
  protected inquiryDetails = [
    { id: 1, detail: 'Edit inquiry', data: [], action: 'edit' },
    { id: 2, detail: 'Approved inquiry', data: [], action: 'fill' },
    { id: 3, detail: 'On production', data: [], action: 'TODO' }
  ];

  private readonly navigationService: NavigationService = inject(NavigationService);

  protected navigate(action: string): void {
    action == 'edit' ? this.navigationService.navigateToInquiryTableEdit() : 0;
  }
}
