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



@NgModule({
    declarations: [
        LaboratoryAnalysisListComponent,
        LaboratoryAnalysisCreateDialogComponent
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
    MatButtonModule
  ]
})
export class LaboratoryAnalysisModule { }
