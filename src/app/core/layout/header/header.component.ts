import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
import {User} from "../../../user/model/user";
import {UserService} from "../../../user/service/user.service";
import {MatDialog} from "@angular/material/dialog";
import {
  RecordSearcherDoctorComponent
} from "../../../record/components/record-searcher-doctor/record-searcher-doctor.component";

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
export class HeaderComponent implements OnInit{
  @Output() sideNavToggle = new EventEmitter<void>();

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

  onSidenavToggle() {
    this.sideNavToggle.next();
  }

  onSearchPatientRecords() {
    this.dialog.open(RecordSearcherDoctorComponent, {
      width: '400px'
    });
  }

    protected readonly ERole = ERole;
}
