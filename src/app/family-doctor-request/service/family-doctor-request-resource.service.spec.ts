import { TestBed } from '@angular/core/testing';

import { FamilyDoctorRequestResourceService } from './family-doctor-request-resource.service';

describe('FamilyDoctorRequestResourceService', () => {
  let service: FamilyDoctorRequestResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyDoctorRequestResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
