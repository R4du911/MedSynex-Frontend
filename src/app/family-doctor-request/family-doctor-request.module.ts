import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FdrFamilyDoctorComponent } from './components/fdr-family-doctor/fdr-family-doctor.component';
import { FdrPatientComponent } from './components/fdr-patient/fdr-patient.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import { FdrMakeRequestDialogComponent } from './components/fdr-make-request-dialog/fdr-make-request-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
    FdrFamilyDoctorComponent,
    FdrPatientComponent,
    FdrMakeRequestDialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class FamilyDoctorRequestModule { }
