import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMoreInfoDoctorComponent } from './register-more-info-doctor.component';

describe('RegisterMoreInfoDoctorComponent', () => {
  let component: RegisterMoreInfoDoctorComponent;
  let fixture: ComponentFixture<RegisterMoreInfoDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterMoreInfoDoctorComponent]
    });
    fixture = TestBed.createComponent(RegisterMoreInfoDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
