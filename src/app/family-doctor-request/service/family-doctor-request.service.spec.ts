import { TestBed } from '@angular/core/testing';

import { FamilyDoctorRequestService } from './family-doctor-request.service';

describe('FamilyDoctorRequestService', () => {
  let service: FamilyDoctorRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyDoctorRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
