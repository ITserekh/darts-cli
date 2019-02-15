import { TestBed, async, inject } from '@angular/core/testing';

import { CanDiactivateGuard } from './can-deactivate.guard';

describe('CanDiactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDiactivateGuard]
    });
  });

  it('should ...', inject([CanDiactivateGuard], (guard: CanDiactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
