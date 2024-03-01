import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'inq-button-add-answer',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './button-add-answer.component.html',
  styleUrl: './button-add-answer.component.css'
})
export class ButtonAddAnswerComponent {
  @Output() public addAnswer: EventEmitter<number> = new EventEmitter();

  protected addAnswerInMultiSelectForm(): void {
    this.addAnswer.emit();
  }
}
