import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { RegisterMoreInfoLaboratoryComponent } from './components/register-more-info-laboratory/register-more-info-laboratory.component';
import { RegisterMoreInfoDoctorComponent } from './components/register-more-info-doctor/register-more-info-doctor.component';
import { RegisterMoreInfoFamilyDoctorComponent } from './components/register-more-info-family-doctor/register-more-info-family-doctor.component';
import { RegisterMoreInfoPatientComponent } from './components/register-more-info-patient/register-more-info-patient.component';



@NgModule({
  declarations: [
    RegisterFormComponent,
    RegisterMoreInfoLaboratoryComponent,
    RegisterMoreInfoDoctorComponent,
    RegisterMoreInfoFamilyDoctorComponent,
    RegisterMoreInfoPatientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    MatOptionModule,
    MatSelectModule
  ]
})
export class RegisterModule { }
