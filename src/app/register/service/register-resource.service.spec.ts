import { TestBed } from '@angular/core/testing';

import { RegisterResourceService } from './register-resource.service';

describe('RegisterResourceService', () => {
  let service: RegisterResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
