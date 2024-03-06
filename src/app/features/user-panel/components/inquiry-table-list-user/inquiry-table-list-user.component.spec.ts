import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryTableListUserComponent } from './inquiry-table-list-user.component';

describe('InquiryTableListUserComponent', () => {
  let component: InquiryTableListUserComponent;
  let fixture: ComponentFixture<InquiryTableListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquiryTableListUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InquiryTableListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
