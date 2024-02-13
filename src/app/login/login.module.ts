import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginShellComponent } from './container/login-shell/login-shell.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {LoginService} from "./service/login.service";
import {LoginResourceService} from "./service/login-resource.service";



@NgModule({
  declarations: [
    LoginShellComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    LoginService,
    LoginResourceService
  ]
})
export class LoginModule { }
