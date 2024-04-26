import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaboratoryAnalysisListComponent } from './components/laboratory-analysis-list/laboratory-analysis-list.component';
import { LaboratoryAnalysisCreateDialogComponent } from './components/laboratory-analysis-create-dialog/laboratory-analysis-create-dialog.component';



@NgModule({
    declarations: [
        LaboratoryAnalysisListComponent,
        LaboratoryAnalysisCreateDialogComponent
    ],
    exports: [
        LaboratoryAnalysisListComponent
    ],
    imports: [
        CommonModule
    ]
})
export class LaboratoryAnalysisModule { }
