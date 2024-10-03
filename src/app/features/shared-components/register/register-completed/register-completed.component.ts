import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MAT_TABS_CONFIG } from '@angular/material/tabs';

@Component({
  selector: 'inq-register-completed',
  standalone: true,
  providers: [{ provide: MAT_TABS_CONFIG, useValue: { animationDuration: '1ms' } }],
  imports: [CommonModule],

  templateUrl: './register-completed.component.html',
  styleUrl: './register-completed.component.css',
  animations: [
    trigger('fadeIn', [
      state('out', style({ opacity: '0' })),
      state('in', style({ opacity: '1' })),
      transition('* => *', [animate(2500)])
    ])
  ]
})
export class RegisterCompletedComponent {
  @Input() public animationState: string = 'out';
  @Input() public isRegistred = false;
}
