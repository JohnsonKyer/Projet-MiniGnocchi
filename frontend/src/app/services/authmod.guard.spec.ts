import { TestBed } from '@angular/core/testing';

import { AuthmodGuard } from './authmod.guard';

describe('AuthmodGuard', () => {
  let guard: AuthmodGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthmodGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
