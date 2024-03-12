import { TestBed } from '@angular/core/testing';

import { InquiryFormServiceService } from './inquiry-form-service.service';

describe('InquiryFormServiceService', () => {
  let service: InquiryFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InquiryFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
