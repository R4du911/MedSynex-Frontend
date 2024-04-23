import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginFormComponent} from "./login/components/login-form/login-form.component";
import {AuthorizationGuard} from "./utils/authorization-guard.service";
import {RegisterFormComponent} from "./register/components/register-form/register-form.component";
import {
  RegisterMoreInfoLaboratoryComponent
} from "./register/components/register-more-info-laboratory/register-more-info-laboratory.component";
import {DeactivateGuard} from "./utils/deactivate.guard";
import {
  RegisterMoreInfoDoctorComponent
} from "./register/components/register-more-info-doctor/register-more-info-doctor.component";
import {
  RegisterMoreInfoFamilyDoctorComponent
} from "./register/components/register-more-info-family-doctor/register-more-info-family-doctor.component";
import {ERole} from "./core/authorization/model/ERole";
import {
  RegisterMoreInfoPatientComponent
} from "./register/components/register-more-info-patient/register-more-info-patient.component";
import {
  FdrFamilyDoctorComponent
} from "./family-doctor-request/components/fdr-family-doctor/fdr-family-doctor.component";
import {FdrPatientComponent} from "./family-doctor-request/components/fdr-patient/fdr-patient.component";
import {FdPatientsListComponent} from "./family-doctor/components/fd-patients-list/fd-patients-list.component";
import {ConsultationListComponent} from "./consultation/components/consultation-list/consultation-list.component";
import {RecordDisplayComponent} from "./record/components/record-display/record-display.component";

const routes : Routes = [
  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'login',
    canActivate: [AuthorizationGuard],
    component: LoginFormComponent
  },

  {
    path: 'register',
    canActivate: [AuthorizationGuard],
    component: RegisterFormComponent,
  },

  {
    path: 'register-patient',
    canActivate: [AuthorizationGuard],
    canDeactivate: [DeactivateGuard],
    data: {roles: [ERole.Patient] },
    component: RegisterMoreInfoPatientComponent
  },

  {
    path: 'register-family-doctor',
    canActivate: [AuthorizationGuard],
    canDeactivate: [DeactivateGuard],
    data: {roles: [ERole.FamilyDoctor] },
    component: RegisterMoreInfoFamilyDoctorComponent
  },

  {
    path: 'register-doctor',
    canActivate: [AuthorizationGuard],
    canDeactivate: [DeactivateGuard],
    data: {roles: [ERole.Doctor] },
    component: RegisterMoreInfoDoctorComponent
  },

  {
    path: 'register-laboratory',
    canActivate: [AuthorizationGuard],
    canDeactivate: [DeactivateGuard],
    data: {roles: [ERole.Laboratory] },
    component: RegisterMoreInfoLaboratoryComponent
  },

  {
    path: 'family-doctor-request/family-doctor',
    canActivate: [AuthorizationGuard],
    data: {roles: [ERole.FamilyDoctor] },
    component: FdrFamilyDoctorComponent
  },

  {
    path: 'family-doctor-request/patient',
    canActivate: [AuthorizationGuard],
    data: {roles: [ERole.Patient] },
    component: FdrPatientComponent
  },

  {
    path: 'my-patients',
    canActivate: [AuthorizationGuard],
    data: {roles: [ERole.FamilyDoctor] },
    component: FdPatientsListComponent
  },

  {
    path: 'records/:cnp',
    canActivate: [AuthorizationGuard],
    data: {roles: [ERole.Patient, ERole.FamilyDoctor, ERole.Doctor] },
    component: RecordDisplayComponent
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
