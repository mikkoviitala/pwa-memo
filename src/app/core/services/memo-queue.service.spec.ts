import { TestBed } from '@angular/core/testing';

import { MemoQueueService } from './memo-queue.service';

describe('MemoQueueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemoQueueService = TestBed.get(MemoQueueService);
    expect(service).toBeTruthy();
  });
});
