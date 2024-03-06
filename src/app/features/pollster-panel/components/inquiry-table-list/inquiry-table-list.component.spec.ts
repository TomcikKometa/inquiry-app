import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryTableListPollsterComponent } from './inquiry-table-list.component';

describe('InquiryTableListComponent', () => {
  let component: InquiryTableListPollsterComponent;
  let fixture: ComponentFixture<InquiryTableListPollsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquiryTableListPollsterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InquiryTableListPollsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
