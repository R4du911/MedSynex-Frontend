import { TestBed } from '@angular/core/testing';

import { LoginResourceService } from './login-resource.service';

describe('LoginResourceService', () => {
  let service: LoginResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
