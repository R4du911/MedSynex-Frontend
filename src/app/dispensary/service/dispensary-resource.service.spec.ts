import { TestBed } from '@angular/core/testing';

import { DispensaryResourceService } from './dispensary-resource.service';

describe('DispensaryResourceService', () => {
  let service: DispensaryResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispensaryResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
