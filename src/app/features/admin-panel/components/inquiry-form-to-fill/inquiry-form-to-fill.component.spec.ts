import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryFormToFillComponent } from './inquiry-form-to-fill.component';

describe('InquiryFormToFillComponent', () => {
  let component: InquiryFormToFillComponent;
  let fixture: ComponentFixture<InquiryFormToFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquiryFormToFillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InquiryFormToFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
