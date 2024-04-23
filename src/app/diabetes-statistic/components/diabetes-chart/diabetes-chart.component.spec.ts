import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabetesChartComponent } from './diabetes-chart.component';

describe('DiabetesChartComponent', () => {
  let component: DiabetesChartComponent;
  let fixture: ComponentFixture<DiabetesChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiabetesChartComponent]
    });
    fixture = TestBed.createComponent(DiabetesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
