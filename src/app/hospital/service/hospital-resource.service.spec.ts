import { TestBed } from '@angular/core/testing';

import { HospitalResourceService } from './hospital-resource.service';

describe('HospitalResourceService', () => {
  let service: HospitalResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
