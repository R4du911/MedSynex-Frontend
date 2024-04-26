import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryAnalysisCreateDialogComponent } from './laboratory-analysis-create-dialog.component';

describe('LaboratoryAnalysisCreateDialogComponent', () => {
  let component: LaboratoryAnalysisCreateDialogComponent;
  let fixture: ComponentFixture<LaboratoryAnalysisCreateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaboratoryAnalysisCreateDialogComponent]
    });
    fixture = TestBed.createComponent(LaboratoryAnalysisCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
