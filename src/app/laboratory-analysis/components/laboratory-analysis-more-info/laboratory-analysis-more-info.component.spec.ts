import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryAnalysisMoreInfoComponent } from './laboratory-analysis-more-info.component';

describe('LaboratoryAnalysisMoreInfoComponent', () => {
  let component: LaboratoryAnalysisMoreInfoComponent;
  let fixture: ComponentFixture<LaboratoryAnalysisMoreInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaboratoryAnalysisMoreInfoComponent]
    });
    fixture = TestBed.createComponent(LaboratoryAnalysisMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
