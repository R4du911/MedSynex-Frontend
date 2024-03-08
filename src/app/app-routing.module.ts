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
import {ERole} from "./user/ERole";
import {
  RegisterMoreInfoPatientComponent
} from "./register/components/register-more-info-patient/register-more-info-patient.component";

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

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
