import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMoreInfoFamilyDoctorComponent } from './register-more-info-family-doctor.component';

describe('RegisterMoreInfoFamilyDoctorComponent', () => {
  let component: RegisterMoreInfoFamilyDoctorComponent;
  let fixture: ComponentFixture<RegisterMoreInfoFamilyDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterMoreInfoFamilyDoctorComponent]
    });
    fixture = TestBed.createComponent(RegisterMoreInfoFamilyDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
