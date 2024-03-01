import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminPanelContainerComponent } from './features/admin-panel/containers/admin-panel-container/admin-panel-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers:[],
  imports: [RouterOutlet, AdminPanelContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
