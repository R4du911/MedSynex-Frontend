import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiabetesChartComponent } from './components/diabetes-chart/diabetes-chart.component';



@NgModule({
    declarations: [
        DiabetesChartComponent
    ],
    exports: [
        DiabetesChartComponent
    ],
    imports: [
        CommonModule
    ]
})
export class DiabetesStatisticModule { }
