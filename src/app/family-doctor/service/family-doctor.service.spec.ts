import { TestBed } from '@angular/core/testing';

import { FamilyDoctorService } from './family-doctor.service';

describe('FamilyDoctorService', () => {
  let service: FamilyDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
