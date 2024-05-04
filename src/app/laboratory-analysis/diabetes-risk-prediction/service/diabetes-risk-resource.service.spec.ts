import { TestBed } from '@angular/core/testing';

import { DiabetesRiskResourceService } from './diabetes-risk-resource.service';

describe('DiabetesRiskResourceService', () => {
  let service: DiabetesRiskResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiabetesRiskResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
