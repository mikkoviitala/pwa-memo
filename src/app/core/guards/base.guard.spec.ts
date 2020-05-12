import { TestBed, async, inject } from '@angular/core/testing';

import { BaseGuardGuard } from './base.guard';

describe('BaseGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseGuardGuard]
    });
  });

  it('should ...', inject([BaseGuardGuard], (guard: BaseGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
