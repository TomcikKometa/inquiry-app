import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddAnswerComponent } from './button-add-answer.component';

describe('ButtonMultiSelectComponent', () => {
  let component: ButtonAddAnswerComponent;
  let fixture: ComponentFixture<ButtonAddAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAddAnswerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonAddAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
