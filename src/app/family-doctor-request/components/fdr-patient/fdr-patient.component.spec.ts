import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdrPatientComponent } from './fdr-patient.component';

describe('FdrPatientComponent', () => {
  let component: FdrPatientComponent;
  let fixture: ComponentFixture<FdrPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdrPatientComponent]
    });
    fixture = TestBed.createComponent(FdrPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
