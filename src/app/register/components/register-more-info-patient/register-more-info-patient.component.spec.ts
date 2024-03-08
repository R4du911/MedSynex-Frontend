import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMoreInfoPatientComponent } from './register-more-info-patient.component';

describe('RegisterMoreInfoPatientComponent', () => {
  let component: RegisterMoreInfoPatientComponent;
  let fixture: ComponentFixture<RegisterMoreInfoPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterMoreInfoPatientComponent]
    });
    fixture = TestBed.createComponent(RegisterMoreInfoPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
