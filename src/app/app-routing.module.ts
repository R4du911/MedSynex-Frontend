import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginFormComponent} from "./login/components/login-form/login-form.component";
import {AuthorizationGuard} from "./utils/authorization-guard.service";
import {RegisterFormComponent} from "./register/components/register-form/register-form.component";
import {
  RegisterMoreInfoLaboratoryComponent
} from "./register/components/register-more-info-laboratory/register-more-info-laboratory.component";

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
    path: 'register-laboratory',
    canActivate: [AuthorizationGuard],
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
