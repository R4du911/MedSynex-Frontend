import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdPatientsListComponent } from './fd-patients-list.component';

describe('FdPatientsListComponent', () => {
  let component: FdPatientsListComponent;
  let fixture: ComponentFixture<FdPatientsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdPatientsListComponent]
    });
    fixture = TestBed.createComponent(FdPatientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
