import { TestBed } from '@angular/core/testing';

import { AuthenticatedGuard } from './authenticated.guard';

describe('AuthenticatedGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticatedGuard = TestBed.get(AuthenticatedGuard);
    expect(service).toBeTruthy();
  });
});
