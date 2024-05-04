import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaboratoryAnalysisListComponent } from './components/laboratory-analysis-list/laboratory-analysis-list.component';
import { LaboratoryAnalysisCreateDialogComponent } from './components/laboratory-analysis-create-dialog/laboratory-analysis-create-dialog.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HasRolesDirective} from "../core/authorization/directives/has-roles.directive";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import { LaboratoryAnalysisEditDialogComponent } from './components/laboratory-analysis-edit-dialog/laboratory-analysis-edit-dialog.component';
import { LaboratoryAnalysisMoreInfoComponent } from './components/laboratory-analysis-more-info/laboratory-analysis-more-info.component';
import { LaboratoryAnalysisDiabetesRiskRequestDialogComponent } from './diabetes-risk-prediction/components/laboratory-analysis-diabetes-risk-request-dialog/laboratory-analysis-diabetes-risk-request-dialog.component';



@NgModule({
    declarations: [
        LaboratoryAnalysisListComponent,
        LaboratoryAnalysisCreateDialogComponent,
        LaboratoryAnalysisEditDialogComponent,
        LaboratoryAnalysisMoreInfoComponent,
        LaboratoryAnalysisDiabetesRiskRequestDialogComponent
    ],
    exports: [
        LaboratoryAnalysisListComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        HasRolesDirective,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule
    ]
})
export class LaboratoryAnalysisModule { }
