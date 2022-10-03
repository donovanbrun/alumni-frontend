import { TestBed } from '@angular/core/testing';

import { AddPromoService } from './add-promo.service';

describe('AddPromoService', () => {
  let service: AddPromoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPromoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
