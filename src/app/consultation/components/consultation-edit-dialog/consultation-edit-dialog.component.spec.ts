import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationEditDialogComponent } from './consultation-edit-dialog.component';

describe('ConsultationEditDialogComponent', () => {
  let component: ConsultationEditDialogComponent;
  let fixture: ComponentFixture<ConsultationEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationEditDialogComponent]
    });
    fixture = TestBed.createComponent(ConsultationEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
