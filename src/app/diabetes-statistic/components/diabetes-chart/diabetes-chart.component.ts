import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, take} from "rxjs";
import {LaboratoryAnalysisResult} from "../../../laboratory-analysis/model/laboratory-analysis-result";
import {LaboratoryAnalysisService} from "../../../laboratory-analysis/service/laboratory-analysis.service";
import {ChartConfiguration} from "chart.js";
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-diabetes-chart',
  templateUrl: './diabetes-chart.component.html',
  styleUrls: ['./diabetes-chart.component.css']
})
export class DiabetesChartComponent implements OnInit, OnDestroy{
  @Input() patientCNP: string = '';

  laboratoryAnalysisResultsByPatientList$: Observable<LaboratoryAnalysisResult[]> = new Observable<LaboratoryAnalysisResult[]>();
  private _componentDestroy$ = new Subject<void>;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets: [{
      data: [],
      label: 'Diabetes Risk Prediction',
      borderColor: '#5F9EA0',
      backgroundColor: '#5F9EA0',
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
            if (numValue === 1)
              return 'True';
            if (numValue === 0)
              return 'False'
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
            const date = new Date(context[0].parsed.x);
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
          },
          label: function(tooltipItem: any) {
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

  constructor(
    private laboratoryAnalysisResultService: LaboratoryAnalysisService
  ) {
  }

  ngOnInit(): void {
    this.laboratoryAnalysisResultService.loadAllLaboratoryAnalysisResultsByPatient(this.patientCNP)
      .pipe(take(1)).subscribe();

    this.laboratoryAnalysisResultsByPatientList$ = this.laboratoryAnalysisResultService.getAllLaboratoryAnalysisResultsByPatient();

    this.laboratoryAnalysisResultsByPatientList$.subscribe((laboratoryAnalysisResults: LaboratoryAnalysisResult[]) => {
      this.updateChartWithData(laboratoryAnalysisResults);
    });
  }

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  updateChartWithData(laboratoryAnalysisResults: LaboratoryAnalysisResult[]): void {
    const filteredResults: LaboratoryAnalysisResult[] = laboratoryAnalysisResults
      .filter((laboratoryAnalysisResult: LaboratoryAnalysisResult) => laboratoryAnalysisResult.diabetesRisk !== null);
    this.lineChartData.datasets[0].data = filteredResults.map((laboratoryAnalysisResult: LaboratoryAnalysisResult) => ({
      x: new Date(laboratoryAnalysisResult.createDate) as any,
      y: laboratoryAnalysisResult.diabetesRisk ? 1 : 0
    }));
  }
}
