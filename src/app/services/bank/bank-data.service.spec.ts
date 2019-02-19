import { TestBed } from '@angular/core/testing';

import { BankDataService } from './bank-data.service';

describe('BankDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankDataService = TestBed.get(BankDataService);
    expect(service).toBeTruthy();
  });
});
