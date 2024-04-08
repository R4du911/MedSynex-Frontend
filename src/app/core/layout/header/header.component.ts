import {Component, EventEmitter, Output} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AuthenticationService} from "../../authentication/service/authentication.service";
import {Observable} from "rxjs";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ERole} from "../../authorization/model/ERole";
import {HasRolesDirective} from "../../authorization/directives/has-roles.directive";
import {MatListModule} from "@angular/material/list";
import {AuthorizationService} from "../../authorization/service/authorization.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    FlexLayoutModule,
    HasRolesDirective,
    MatListModule,
  ],
  standalone: true
})
export class HeaderComponent {
  @Output() sideNavToggle = new EventEmitter<void>();

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

  onSidenavToggle() {
    this.sideNavToggle.next();
  }

    protected readonly ERole = ERole;
}
