import { TestBed } from '@angular/core/testing';

import { NaviationService } from './naviation.service';

describe('NaviationService', () => {
  let service: NaviationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NaviationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
