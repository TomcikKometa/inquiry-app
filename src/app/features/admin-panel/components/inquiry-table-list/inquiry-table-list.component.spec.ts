import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryTableListComponent } from './inquiry-table-list.component';

describe('InquiryTableListComponent', () => {
  let component: InquiryTableListComponent;
  let fixture: ComponentFixture<InquiryTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquiryTableListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InquiryTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
