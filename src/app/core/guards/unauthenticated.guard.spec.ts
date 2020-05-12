import { TestBed, async, inject } from '@angular/core/testing';

import { UnauthenticatedGuardGuard } from './unauthenticated.guard';

describe('UnauthenticatedGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnauthenticatedGuardGuard]
    });
  });

  it('should ...', inject([UnauthenticatedGuardGuard], (guard: UnauthenticatedGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
