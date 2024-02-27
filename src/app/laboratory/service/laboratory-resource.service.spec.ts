import { TestBed } from '@angular/core/testing';

import { LaboratoryResourceService } from './laboratory-resource.service';

describe('LaboratoryResourceService', () => {
  let service: LaboratoryResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaboratoryResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
