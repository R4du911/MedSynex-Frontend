import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSearcherDoctorComponent } from './record-searcher-doctor.component';

describe('RecordSearcherDoctorComponent', () => {
  let component: RecordSearcherDoctorComponent;
  let fixture: ComponentFixture<RecordSearcherDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordSearcherDoctorComponent]
    });
    fixture = TestBed.createComponent(RecordSearcherDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
