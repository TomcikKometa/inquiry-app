import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortquestionAnswerComponent } from './shortquestion-answer.component';

describe('ShortquestionAnswerComponent', () => {
  let component: ShortquestionAnswerComponent;
  let fixture: ComponentFixture<ShortquestionAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortquestionAnswerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShortquestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
