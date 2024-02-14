import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginFormComponent} from "./login/components/login-form/login-form.component";
import {AuthorizationGuard} from "./utils/authorization-guard.service";

const routes : Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginFormComponent, canActivate: [AuthorizationGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
