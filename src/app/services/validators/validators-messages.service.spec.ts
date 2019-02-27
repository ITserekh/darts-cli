import { TestBed } from '@angular/core/testing';

import { ValidatorsMessagesService } from './validators-messages.service';

describe('ValidatorsMassegesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidatorsMessagesService = TestBed.get(ValidatorsMessagesService);
    expect(service).toBeTruthy();
  });
});
