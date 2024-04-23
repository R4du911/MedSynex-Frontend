import {Component, OnInit} from '@angular/core';
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
import {UserService} from "../../../user/service/user.service";
import {User} from "../../../user/model/user";
import {MatDialog} from "@angular/material/dialog";
import {
  RecordSearcherDoctorComponent
} from "../../../record/components/record-searcher-doctor/record-searcher-doctor.component";



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
export class NavbarComponent implements OnInit{
  currentUser$: Observable<string | null>;
  userCNP: number | undefined;

  constructor(
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private userService: UserService
  ) {
    this.currentUser$ = this.authenticationService.currentUser$;
  }

  ngOnInit(): void {
    this.currentUser$.subscribe((username: string | null) => {
      if(username)
        this.userService.loadCurrentUserDetails(username).subscribe((user: User) => {
          this.userCNP = user.patient?.cnp
        });
    });
  }

  isUserLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  logout(): void {
    this.authenticationService.logout();
    this.authorizationService.logout();
  }

  onSearchPatientRecords() {
    this.dialog.open(RecordSearcherDoctorComponent, {
      width: '400px'
    });
  }

  protected readonly ERole = ERole;
}
