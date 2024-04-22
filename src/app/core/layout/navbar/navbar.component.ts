import {Component} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {HeaderComponent} from "../header/header.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AuthenticationService} from "../../authentication/service/authentication.service";
import {Observable} from "rxjs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ERole} from "../../authorization/model/ERole";
import {HasRolesDirective} from "../../authorization/directives/has-roles.directive";
import {AuthorizationService} from "../../authorization/service/authorization.service";



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    HeaderComponent,
    MatTooltipModule,
    HeaderComponent,
    RouterModule,
    CommonModule,
    FlexLayoutModule,
    HasRolesDirective
  ],
  standalone: true
})
export class NavbarComponent {
  currentUser$: Observable<string | null>;
  constructor(
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService
  ) {
    this.currentUser$ = this.authenticationService.currentUser$;
  }

  isUserLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  logout(): void {
    this.authenticationService.logout();
    this.authorizationService.logout();
  }

  protected readonly ERole = ERole;
}
