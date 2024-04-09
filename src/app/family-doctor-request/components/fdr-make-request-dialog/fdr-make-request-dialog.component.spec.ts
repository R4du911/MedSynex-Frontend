import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdrMakeRequestDialogComponent } from './fdr-make-request-dialog.component';

describe('FdrMakeRequestDialogComponent', () => {
  let component: FdrMakeRequestDialogComponent;
  let fixture: ComponentFixture<FdrMakeRequestDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdrMakeRequestDialogComponent]
    });
    fixture = TestBed.createComponent(FdrMakeRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
