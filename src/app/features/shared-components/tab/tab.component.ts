import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'inq-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  @Input() public isActive: boolean = false;
  @Input({ required: true }) public title!: number;
}
