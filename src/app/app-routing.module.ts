import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginShellComponent} from "./login/container/login-shell/login-shell.component";

const routes : Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginShellComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
