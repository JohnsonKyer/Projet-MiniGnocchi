import { TestBed } from '@angular/core/testing';

import { AuthannonceurGuard } from './authannonceur.guard';

describe('AuthannonceurGuard', () => {
  let guard: AuthannonceurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthannonceurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
