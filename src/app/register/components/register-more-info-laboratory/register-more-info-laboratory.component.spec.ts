import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMoreInfoLaboratoryComponent } from './register-more-info-laboratory.component';

describe('RegisterMoreInfoLaboratoryComponent', () => {
  let component: RegisterMoreInfoLaboratoryComponent;
  let fixture: ComponentFixture<RegisterMoreInfoLaboratoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterMoreInfoLaboratoryComponent]
    });
    fixture = TestBed.createComponent(RegisterMoreInfoLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
