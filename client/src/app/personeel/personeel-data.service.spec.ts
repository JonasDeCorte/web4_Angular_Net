import { TestBed } from '@angular/core/testing';

import { PersoneelDataService } from './personeel-data.service';

describe('PersoneelDataService', () => {
  let service: PersoneelDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersoneelDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
