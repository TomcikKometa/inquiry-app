import { TestBed } from '@angular/core/testing';

import { InquiryFormService } from './inquiry-form-service.service';

describe('InquiryFormServiceService', () => {
  let service: InquiryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InquiryFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
