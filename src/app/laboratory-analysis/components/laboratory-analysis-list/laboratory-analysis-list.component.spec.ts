import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryAnalysisListComponent } from './laboratory-analysis-list.component';

describe('LaboratoryAnalysisListComponent', () => {
  let component: LaboratoryAnalysisListComponent;
  let fixture: ComponentFixture<LaboratoryAnalysisListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaboratoryAnalysisListComponent]
    });
    fixture = TestBed.createComponent(LaboratoryAnalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
