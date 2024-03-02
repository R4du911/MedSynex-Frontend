import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from './core/layout/header/header.component';
import {NavbarComponent} from './core/layout/navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginModule} from "./login/login.module";
import {AuthorizationGuard} from "./utils/authorization-guard.service";
import {HandleErrorService} from "./utils/error-handling/service/handle-error.service";
import {Interceptor} from "./utils/http-interceptor";
import {ToastrModule} from "ngx-toastr";
import {AuthorizationService} from "./core/authorization/service/authorization.service";
import {AuthenticationService} from "./core/authentication/service/authentication.service";
import {ERole} from "./user/ERole";
import {RegisterModule} from "./register/register.module";
import {LaboratoryModule} from "./laboratory/laboratory.module";
import {DeactivateGuard} from "./utils/deactivate.guard";
import {HospitalModule} from "./hospital/hospital.module";
import {SpecializationModule} from "./specialization/specialization.module";

function initializeAppFactory(
  authorizationService: AuthorizationService,
  authenticationService: AuthenticationService
): () => ERole[] {
  return () => {
    return authenticationService.isLoggedIn()
      ? authorizationService.getUserRoles()
      : []
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HeaderComponent,
    NavbarComponent,
    HttpClientModule,
    LoginModule,
    RegisterModule,
    LaboratoryModule,
    HospitalModule,
    SpecializationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      maxOpened: 4,
      closeButton: true,
      autoDismiss: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    AuthorizationGuard,
    DeactivateGuard,
    HandleErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [AuthorizationService, AuthenticationService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
