import { TestBed } from '@angular/core/testing';

import { SpecializationResourceService } from './specialization-resource.service';

describe('SpecializationResourceService', () => {
  let service: SpecializationResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecializationResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
