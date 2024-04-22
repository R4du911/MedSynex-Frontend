import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationMoreInfoComponent } from './consultation-more-info.component';

describe('ConsultationMoreInfoComponent', () => {
  let component: ConsultationMoreInfoComponent;
  let fixture: ComponentFixture<ConsultationMoreInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationMoreInfoComponent]
    });
    fixture = TestBed.createComponent(ConsultationMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
