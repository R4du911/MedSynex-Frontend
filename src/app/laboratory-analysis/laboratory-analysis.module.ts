import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaboratoryAnalysisListComponent } from './components/laboratory-analysis-list/laboratory-analysis-list.component';



@NgModule({
    declarations: [
        LaboratoryAnalysisListComponent
    ],
    exports: [
        LaboratoryAnalysisListComponent
    ],
    imports: [
        CommonModule
    ]
})
export class LaboratoryAnalysisModule { }
