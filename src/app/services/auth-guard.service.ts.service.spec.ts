import { TestBed } from '@angular/core/testing';

import { AuthGuardServiceTsService } from './auth-guard.service.ts.service';

describe('AuthGuardServiceTsService', () => {
  let service: AuthGuardServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
