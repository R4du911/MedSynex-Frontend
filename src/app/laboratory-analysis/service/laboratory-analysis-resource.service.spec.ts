import { TestBed } from '@angular/core/testing';

import { LaboratoryAnalysisResourceService } from './laboratory-analysis-resource.service';

describe('LaboratoryAnalysisResourceService', () => {
  let service: LaboratoryAnalysisResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaboratoryAnalysisResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
