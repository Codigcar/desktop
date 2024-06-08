import { TestBed } from '@angular/core/testing';

import { FutbolService } from './futbol.service';

describe('FutbolService', () => {
  let service: FutbolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FutbolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
