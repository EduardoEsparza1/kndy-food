import { TestBed } from '@angular/core/testing';

import { CodigoqrService } from './codigoqr.service';

describe('CodigoqrService', () => {
  let service: CodigoqrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodigoqrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
