import { TestBed } from '@angular/core/testing';

import { FamilyDoctorResourceService } from './family-doctor-resource.service';

describe('FamilyDoctorResourceService', () => {
  let service: FamilyDoctorResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyDoctorResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
