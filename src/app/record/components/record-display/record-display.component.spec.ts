import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDisplayComponent } from './record-display.component';

describe('RecordDisplayComponent', () => {
  let component: RecordDisplayComponent;
  let fixture: ComponentFixture<RecordDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordDisplayComponent]
    });
    fixture = TestBed.createComponent(RecordDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
