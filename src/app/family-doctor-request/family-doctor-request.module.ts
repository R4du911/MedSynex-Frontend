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



@NgModule({
  declarations: [
    FdrFamilyDoctorComponent,
    FdrPatientComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
  ]
})
export class FamilyDoctorRequestModule { }
