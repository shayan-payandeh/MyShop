import { TestBed } from '@angular/core/testing';

import { ShoppingCartsService } from './shopping-carts.service';

describe('ShoppingCartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingCartsService = TestBed.get(ShoppingCartsService);
    expect(service).toBeTruthy();
  });
});
