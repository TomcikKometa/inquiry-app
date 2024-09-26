import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;

  const spyRouter: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', [
    'navigate',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: spyRouter }],
    });

    service = TestBed.inject(NavigationService);
  });

  describe('service init', () => {
    it('should create service', () => {
      expect(service).toBeTruthy();
    });
  });
});
