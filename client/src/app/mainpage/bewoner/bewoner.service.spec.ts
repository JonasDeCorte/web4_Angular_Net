import { TestBed } from '@angular/core/testing';

import { BewonerService } from './bewoner.service';

describe('BewonerService', () => {
  let service: BewonerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BewonerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
