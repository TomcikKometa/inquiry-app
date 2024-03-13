import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectAnswerComponent } from './multiselect-answer.component';

describe('MultiselectAnswerComponent', () => {
  let component: MultiselectAnswerComponent;
  let fixture: ComponentFixture<MultiselectAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiselectAnswerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiselectAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
