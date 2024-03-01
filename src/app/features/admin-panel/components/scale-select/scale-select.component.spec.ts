import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleSelectComponent } from './scale-select.component';

describe('ScaleSelectComponent', () => {
  let component: ScaleSelectComponent;
  let fixture: ComponentFixture<ScaleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScaleSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScaleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
