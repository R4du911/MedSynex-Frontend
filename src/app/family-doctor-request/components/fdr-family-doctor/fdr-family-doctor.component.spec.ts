import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdrFamilyDoctorComponent } from './fdr-family-doctor.component';

describe('FdrFamilyDoctorComponent', () => {
  let component: FdrFamilyDoctorComponent;
  let fixture: ComponentFixture<FdrFamilyDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdrFamilyDoctorComponent]
    });
    fixture = TestBed.createComponent(FdrFamilyDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
