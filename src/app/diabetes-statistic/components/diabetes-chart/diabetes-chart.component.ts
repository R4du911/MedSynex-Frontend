import {Component, Input, OnDestroy, OnInit, ViewChild, AfterContentInit} from '@angular/core';
import {Observable, Subject, take, takeUntil} from 'rxjs';
import { LaboratoryAnalysisResult } from '../../../laboratory-analysis/model/laboratory-analysis-result';
import { LaboratoryAnalysisService } from '../../../laboratory-analysis/service/laboratory-analysis.service';
import { ChartConfiguration } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'app-diabetes-chart',
  templateUrl: './diabetes-chart.component.html',
  styleUrls: ['./diabetes-chart.component.css']
})
export class DiabetesChartComponent implements OnInit, OnDestroy, AfterContentInit {
  @Input() patientCNP: string = '';
  selectedRange: number = 6;
  private allLaboratoryAnalysisResults: LaboratoryAnalysisResult[] = [];

  laboratoryAnalysisResultsByPatientList$: Observable<LaboratoryAnalysisResult[]> = new Observable<LaboratoryAnalysisResult[]>();
  private _componentDestroy$ = new Subject<void>();

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets: [{
      data: [],
      label: 'Diabetes Risk Prediction',
      borderColor: '',
      backgroundColor: '',
      fill: false,
      pointRadius: 3,
      pointHoverRadius: 5,
    }]
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    elements: {
      line: {
        borderWidth: 2
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM d'
          }
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        beginAtZero: true,
        min: -0.05,
        max: 1.05,
        ticks: {
          stepSize: 1,
          callback: function (tickValue: string | number) {
            const numValue: number = Number(tickValue);
            if (numValue === 1) return 'True';
            if (numValue === 0) return 'False';
            return '';
          }
        },
        title: {
          display: true,
          text: 'Diabetes Risk Prediction Result'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function (context: any) {
            const date: Date = new Date(context[0].parsed.x);
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
          },
          label: function (tooltipItem: any) {
            const label = tooltipItem.dataset.label || '';
            if (label) {
              return `${label}: ${tooltipItem.parsed.y === 1 ? 'True' : 'False'}`;
            }
            return '';
          }
        }
      }
    }
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private laboratoryAnalysisResultService: LaboratoryAnalysisService
  ) { }

  ngOnInit(): void {
    this.selectedRange = 6;

    this.laboratoryAnalysisResultService.loadAllLaboratoryAnalysisResultsByPatient(this.patientCNP)
      .pipe(take(1)).subscribe();

    this.laboratoryAnalysisResultsByPatientList$ = this.laboratoryAnalysisResultService.getAllLaboratoryAnalysisResultsByPatient();
  }

  ngAfterContentInit(): void {
    this.laboratoryAnalysisResultsByPatientList$
      .pipe(takeUntil(this._componentDestroy$))
      .subscribe((laboratoryAnalysisResults: LaboratoryAnalysisResult[]) => {
        this.allLaboratoryAnalysisResults = laboratoryAnalysisResults;
        console.log(this.allLaboratoryAnalysisResults);
        this.filterDataByDateRange(this.selectedRange);
      });

    this.createGradient();
    this.chart?.update();
  }

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  createGradient(): void {
    const canvas = document.getElementById('diabetes-chart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const data = this.lineChartData.datasets[0].data as any[];
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

        data.forEach((point, index) => {
          const color = point.y === 1 ? '#CD5C5C' : '#5F9EA0';
          const offset = index / (data.length - 1);
          gradient.addColorStop(offset, color);
        });

        this.lineChartData.datasets[0].borderColor = gradient;
        this.lineChartData.datasets[0].backgroundColor = gradient;
      }
    }
  }

  filterDataByDateRange(months: number): void {
    this.selectedRange = months;
    const cutoffDate: Date = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - months);

    const filteredResults: LaboratoryAnalysisResult[] = this.allLaboratoryAnalysisResults
      .filter((result: LaboratoryAnalysisResult) => new Date(result.createDate) >= cutoffDate)
      .filter((result: LaboratoryAnalysisResult) => result.diabetesRisk !== null);

    this.lineChartData.datasets[0].data = filteredResults.map((laboratoryAnalysisResult: LaboratoryAnalysisResult) => ({
      x: new Date(laboratoryAnalysisResult.createDate) as any,
      y: laboratoryAnalysisResult.diabetesRisk ? 1 : 0
    }));

    this.createGradient();
    this.chart?.update();
  }
}
