import { TestBed } from '@angular/core/testing';

import { LaboratoryAnalysisService } from './laboratory-analysis.service';

describe('LaboratoryAnalysisService', () => {
  let service: LaboratoryAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaboratoryAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
