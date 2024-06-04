import { Component, Input, OnDestroy, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { LaboratoryAnalysisResult } from '../../../laboratory-analysis/model/laboratory-analysis-result';
import { LaboratoryAnalysisService } from '../../../laboratory-analysis/service/laboratory-analysis.service';
import { ChartConfiguration, Chart } from 'chart.js';
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
      legend: {
        display: false
      },
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
        this.filterDataByDateRange(this.selectedRange);
      });

    this.chart?.update();
  }

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  filterDataByDateRange(months: number): void {
    this.selectedRange = months;
    const cutoffDate: Date = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - months);

    const filteredResults: LaboratoryAnalysisResult[] = this.allLaboratoryAnalysisResults
      .filter((result: LaboratoryAnalysisResult) => new Date(result.createDate) >= cutoffDate)
      .filter((result: LaboratoryAnalysisResult) => result.diabetesRisk !== null)
      .sort((a, b) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime());

    this.lineChartData.datasets[0].data = filteredResults.map((laboratoryAnalysisResult: LaboratoryAnalysisResult) => ({
      x: new Date(laboratoryAnalysisResult.createDate) as any,
      y: laboratoryAnalysisResult.diabetesRisk ? 1 : 0
    }));

    this.chart?.update();
  }
}

Chart.register({
  id: 'customGradientPlugin',
  afterDatasetsDraw(chart) {
    const { ctx, scales: { x, y } } = chart;
    const dataset = chart.data.datasets[0].data as any[];

    if (!dataset.length) return;

    ctx.save();

    for (let i = 0; i < dataset.length - 1; i++) {
      const point = dataset[i];
      const nextPoint = dataset[i + 1];

      const gradient = ctx.createLinearGradient(
        x.getPixelForValue(point.x),
        y.getPixelForValue(point.y),
        x.getPixelForValue(nextPoint.x),
        y.getPixelForValue(nextPoint.y)
      );
      gradient.addColorStop(0, point.y === 1 ? '#CD5C5C' : '#5F9EA0');
      gradient.addColorStop(1, nextPoint.y === 1 ? '#CD5C5C' : '#5F9EA0');

      ctx.beginPath();

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;

      ctx.moveTo(x.getPixelForValue(point.x), y.getPixelForValue(point.y));
      ctx.lineTo(x.getPixelForValue(nextPoint.x), y.getPixelForValue(nextPoint.y));

      ctx.stroke();
    }

    ctx.restore();
  }
});
