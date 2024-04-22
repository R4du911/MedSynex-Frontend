import {AfterContentInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {filter, map, Observable, Subject, take, takeUntil} from "rxjs";
import {User} from "../../../user/model/user";
import {Patient} from "../../../patient/model/patient";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ERole} from "../../../core/authorization/model/ERole";
import {AuthorizationService} from "../../../core/authorization/service/authorization.service";
import {AuthenticationService} from "../../../core/authentication/service/authentication.service";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";
import {FamilyDoctorService} from "../../service/family-doctor.service";
import {UserService} from "../../../user/service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fd-patients-list',
  templateUrl: './fd-patients-list.component.html',
  styleUrls: ['./fd-patients-list.component.css']
})
export class FdPatientsListComponent implements OnInit, OnDestroy, AfterContentInit{
  registeredPatientsList$ : Observable<Patient[]> = new Observable<Patient[]>();
  usersRegisteredAsPatientsList$: Observable<User[]> = new Observable<User[]>();
  dataSource = new MatTableDataSource<Patient>();

  private _componentDestroy$ = new Subject<void>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private familyDoctorService: FamilyDoctorService,
    private userService: UserService,
    private authorizationService: AuthorizationService,
    private authenticationService: AuthenticationService,
    private handleErrorService: HandleErrorService
  ) {
  }

  ngAfterContentInit() {
    this.registeredPatientsList$
      .pipe(takeUntil(this._componentDestroy$))
      .subscribe((patients: Patient[]) => {
        patients.forEach((patient: Patient) => {
          this.getUserByPatientId(patient)
            .pipe(takeUntil(this._componentDestroy$))
            .subscribe((user: User) => {
              patient.lastName = user.lastName;
              patient.firstName = user.firstName;
            });
        });

        this.dataSource.data = patients;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  ngOnInit(): void {
    const userRole : ERole[] = this.authorizationService.getUserRoles();
    const username : string | null = this.authenticationService.getLoggedInUsername();

    if(username !== null) {
      if(userRole.includes(ERole.FamilyDoctor)) {
        this.familyDoctorService.loadAllPatientsRegisteredAtAGivenFamilyDoctor(username)
          .pipe(take(1)).subscribe();

        this.userService.loadUsersWhichAreRegisteredAsPatients()
          .pipe(take(1)).subscribe();
      }

      this.registeredPatientsList$ = this.familyDoctorService.getAllPatientsRegisteredAtAGivenFamilyDoctor();
      this.usersRegisteredAsPatientsList$ = this.userService.getUsersWhichAreRegisteredAsWantedRole();
    } else {
      this.handleErrorService.handleError({ errorCode: "INVALID_USER", message: "User is invalid" });
    }
  }

  getUserByPatientId(patient: Patient): Observable<User> {
    return this.usersRegisteredAsPatientsList$.pipe(
      map((users: User[]) => users.find((user: User) => user?.patient?.cnp === patient?.cnp)),
      filter((user: User | undefined): user is User => user !== undefined && user !== null)
    );
  }

  onMoreInfo(patient: Patient) {
    this.router.navigate(['records', patient.cnp]);
  }
}
