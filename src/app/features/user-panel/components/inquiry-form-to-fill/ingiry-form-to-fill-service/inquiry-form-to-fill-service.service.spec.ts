import { TestBed } from '@angular/core/testing';

import { InquiryFormToFillServiceService } from './inquiry-form-to-fill-service.service';

describe('InquiryFormToFillServiceService', () => {
  let service: InquiryFormToFillServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InquiryFormToFillServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
