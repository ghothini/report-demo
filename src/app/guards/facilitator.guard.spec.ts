import { TestBed } from '@angular/core/testing';

import { FacilitatorGuard } from './facilitator.guard';

describe('FacilitatorGuard', () => {
  let guard: FacilitatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FacilitatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
