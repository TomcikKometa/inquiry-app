import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleselectAnswerComponent } from './singleselect-answer.component';

describe('SingleselectAnswerComponent', () => {
  let component: SingleselectAnswerComponent;
  let fixture: ComponentFixture<SingleselectAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleselectAnswerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleselectAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
