import { TestBed } from '@angular/core/testing';

import { DiabetesRiskService } from './diabetes-risk.service';

describe('DiabetesRiskService', () => {
  let service: DiabetesRiskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiabetesRiskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
