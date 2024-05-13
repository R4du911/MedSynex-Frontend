import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiabetesChartComponent } from './components/diabetes-chart/diabetes-chart.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
    declarations: [
        DiabetesChartComponent
    ],
    exports: [
        DiabetesChartComponent
    ],
    imports: [
        CommonModule,
        NgChartsModule
    ]
})
export class DiabetesStatisticModule { }
