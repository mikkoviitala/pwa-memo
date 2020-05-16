import { TestBed, async, inject } from '@angular/core/testing';

import { UnauthenticatedGuard } from './unauthenticated.guard';

describe('UnauthenticatedGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnauthenticatedGuard]
    });
  });

  it('should ...', inject([UnauthenticatedGuard], (guard: UnauthenticatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
