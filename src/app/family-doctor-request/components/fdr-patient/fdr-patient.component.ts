import {AfterContentInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {filter, map, Observable, Subject, take, takeUntil} from "rxjs";
import {FamilyDoctorRequest} from "../../model/family-doctor-request";
import {User} from "../../../user/model/user";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FamilyDoctorRequestService} from "../../service/family-doctor-request.service";
import {UserService} from "../../../user/service/user.service";
import {AuthenticationService} from "../../../core/authentication/service/authentication.service";
import {AuthorizationService} from "../../../core/authorization/service/authorization.service";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";
import {ERole} from "../../../core/authorization/model/ERole";
import {FamilyDoctor} from "../../../family-doctor/model/family-doctor";
import {PatientService} from "../../../patient/service/patient.service";

@Component({
  selector: 'app-fdr-patient',
  templateUrl: './fdr-patient.component.html',
  styleUrls: ['./fdr-patient.component.css']
})
export class FdrPatientComponent implements OnInit, OnDestroy, AfterContentInit{
  familyDoctorRequestList$ : Observable<FamilyDoctorRequest[]> = new Observable<FamilyDoctorRequest[]>();
  usersRegisteredAsFamilyDoctorsList$: Observable<User[]> = new Observable<User[]>();
  dataSource = new MatTableDataSource<FamilyDoctorRequest>();

  private _componentDestroy$ = new Subject<void>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public registeredFamilyDoctor: FamilyDoctor | null = null;

  constructor(
    private familyDoctorRequestService: FamilyDoctorRequestService,
    private patientService: PatientService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private handleErrorService: HandleErrorService
  ) {
  }

  ngAfterContentInit(): void {
    this.familyDoctorRequestList$
      .pipe(takeUntil(this._componentDestroy$))
      .subscribe((familyDoctorRequests: FamilyDoctorRequest[]) => {
        familyDoctorRequests.forEach((familyDoctorRequest: FamilyDoctorRequest) => {
          this.getUserByFamilyDoctorId(familyDoctorRequest.familyDoctor)
            .pipe(takeUntil(this._componentDestroy$))
            .subscribe((user: User) => {
              familyDoctorRequest.familyDoctor.lastName = user.lastName;
              familyDoctorRequest.familyDoctor.firstName = user.firstName;
            });
        });

        this.dataSource.data = familyDoctorRequests;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  ngOnInit(): void {
    const userRole : ERole[] = this.authorizationService.getUserRoles();
    const username: string | null = this.authenticationService.getLoggedInUsername();

    if(username !== null) {
      if(userRole.includes(ERole.Patient)) {
        this.familyDoctorRequestService.loadAllFamilyDoctorRequestForAGivenPatient(username)
          .pipe(take(1)).subscribe();

        this.userService.loadUsersWhichAreRegisteredAsFamilyDoctors()
          .pipe(take(1)).subscribe();

        this.patientService.getRegisteredFamilyDoctorOfGivenPatient(username).pipe(take(1))
          .subscribe((familyDoctor: FamilyDoctor) => {
            this.getUserByFamilyDoctorId(familyDoctor)
              .pipe(take(1))
              .subscribe((user : User) => {
                familyDoctor.lastName = user.lastName;
                familyDoctor.firstName = user.firstName;
              });

            this.registeredFamilyDoctor = familyDoctor
          });
      }

      this.familyDoctorRequestList$ = this.familyDoctorRequestService.getFamilyDoctorRequests();
      this.usersRegisteredAsFamilyDoctorsList$ = this.userService.getUsersWhichAreRegisteredAsWantedRole();
    } else {
      this.handleErrorService.handleError({ errorCode: "INVALID_USER", message: "User is invalid" });
    }
  }

  getUserByFamilyDoctorId(familyDoctor: FamilyDoctor): Observable<User> {
    return this.usersRegisteredAsFamilyDoctorsList$.pipe(
      map((users: User[]) => users.find((user: User) => user?.familyDoctor?.id === familyDoctor?.id)),
      filter((user: User | undefined): user is User => user !== undefined)
    );
  }

  onMakeRequest() {

  }
}
