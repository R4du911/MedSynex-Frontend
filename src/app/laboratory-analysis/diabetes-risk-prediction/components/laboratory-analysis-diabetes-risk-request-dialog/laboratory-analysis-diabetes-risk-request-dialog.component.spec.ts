import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryAnalysisDiabetesRiskRequestDialogComponent } from './laboratory-analysis-diabetes-risk-request-dialog.component';

describe('LaboratoryAnalysisDiabetesRiskRequestDialogComponent', () => {
  let component: LaboratoryAnalysisDiabetesRiskRequestDialogComponent;
  let fixture: ComponentFixture<LaboratoryAnalysisDiabetesRiskRequestDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaboratoryAnalysisDiabetesRiskRequestDialogComponent]
    });
    fixture = TestBed.createComponent(LaboratoryAnalysisDiabetesRiskRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
