import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryAnalysisEditDialogComponent } from './laboratory-analysis-edit-dialog.component';

describe('LaboratoryAnalysisEditDialogComponent', () => {
  let component: LaboratoryAnalysisEditDialogComponent;
  let fixture: ComponentFixture<LaboratoryAnalysisEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaboratoryAnalysisEditDialogComponent]
    });
    fixture = TestBed.createComponent(LaboratoryAnalysisEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
