import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardPanelContainerComponent } from './features/admin-panel/containers/dashboard-panel-container/dashboard-panel-container.component';
import { LoginComponent } from './features/admin-panel/components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers:[],
  imports: [RouterOutlet, DashboardPanelContainerComponent,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
