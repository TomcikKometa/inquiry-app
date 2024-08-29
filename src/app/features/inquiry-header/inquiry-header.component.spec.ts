import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryHeaderComponent } from './inquiry-header.component';

describe('InquiryHeaderComponent', () => {
  let component: InquiryHeaderComponent;
  let fixture: ComponentFixture<InquiryHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquiryHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InquiryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
