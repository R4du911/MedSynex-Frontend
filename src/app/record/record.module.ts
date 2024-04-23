import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordSearcherDoctorComponent } from './components/record-searcher-doctor/record-searcher-doctor.component';
import { RecordDisplayComponent } from './components/record-display/record-display.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {ConsultationModule} from "../consultation/consultation.module";
import {LaboratoryAnalysisModule} from "../laboratory-analysis/laboratory-analysis.module";
import {DiabetesStatisticModule} from "../diabetes-statistic/diabetes-statistic.module";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    RecordSearcherDoctorComponent,
    RecordDisplayComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    ConsultationModule,
    LaboratoryAnalysisModule,
    DiabetesStatisticModule,
    MatCardModule
  ]
})
export class RecordModule { }
