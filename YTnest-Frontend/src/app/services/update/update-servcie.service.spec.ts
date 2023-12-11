import { TestBed } from '@angular/core/testing';

import { UpdateServcieService } from './update-servcie.service';

describe('UpdateServcieService', () => {
  let service: UpdateServcieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateServcieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
