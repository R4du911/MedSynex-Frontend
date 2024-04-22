import { TestBed } from '@angular/core/testing';

import { ConsultationResourceService } from './consultation-resource.service';

describe('ConsultationResourceService', () => {
  let service: ConsultationResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
