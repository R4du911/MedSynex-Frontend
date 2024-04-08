import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FdrFamilyDoctorComponent } from './components/fdr-family-doctor/fdr-family-doctor.component';
import { FdrPatientComponent } from './components/fdr-patient/fdr-patient.component';



@NgModule({
  declarations: [
    FdrFamilyDoctorComponent,
    FdrPatientComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FamilyDoctorRequestModule { }
