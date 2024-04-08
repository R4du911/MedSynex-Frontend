import {AfterContentInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FamilyDoctorRequestService} from "../../service/family-doctor-request.service";
import {filter, map, Observable, Subject, take, takeUntil} from "rxjs";
import {ERole} from "../../../core/authorization/model/ERole";
import {AuthorizationService} from "../../../core/authorization/service/authorization.service";
import {AuthenticationService} from "../../../core/authentication/service/authentication.service";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";
import {FamilyDoctorRequest} from "../../model/family-doctor-request";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../../user/service/user.service";
import {User} from "../../../user/model/user";
import {Patient} from "../../../patient/model/patient";
import {CustomErrorResponse} from "../../../utils/error-handling/model/custom-error-response";

@Component({
  selector: 'app-fdr-family-doctor',
  templateUrl: './fdr-family-doctor.component.html',
  styleUrls: ['./fdr-family-doctor.component.css']
})
export class FdrFamilyDoctorComponent implements OnInit, OnDestroy, AfterContentInit{
  familyDoctorRequestList$ : Observable<FamilyDoctorRequest[]> = new Observable<FamilyDoctorRequest[]>();
  usersRegisteredAsPatientsList$: Observable<User[]> = new Observable<User[]>();
  dataSource = new MatTableDataSource<FamilyDoctorRequest>();

  private _componentDestroy$ = new Subject<void>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private familyDoctorRequestService: FamilyDoctorRequestService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private handleErrorService: HandleErrorService
  ) {
  }

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  ngOnInit(): void {
    const userRole : ERole[] = this.authorizationService.getUserRoles();
    const username = this.authenticationService.getLoggedInUsername();

    if(username !== null) {
      if(userRole.includes(ERole.FamilyDoctor)) {
        this.familyDoctorRequestService.loadAllFamilyDoctorRequestForAGivenFamilyDoctor(username)
          .pipe(take(1)).subscribe();

        this.userService.loadUsersWhichAreRegisteredAsPatients()
          .pipe(take(1)).subscribe();
      }

      this.familyDoctorRequestList$ = this.familyDoctorRequestService.getFamilyDoctorRequests();
      this.usersRegisteredAsPatientsList$ = this.userService.getUsersWhichAreRegisteredAsWantedRole();
    } else {
      this.handleErrorService.handleError({ errorCode: "INVALID_USER", message: "User is invalid" });
    }
  }

  ngAfterContentInit() {
    this.familyDoctorRequestList$
      .pipe(takeUntil(this._componentDestroy$))
      .subscribe((familyDoctorRequests: FamilyDoctorRequest[]) => {
      familyDoctorRequests.forEach((familyDoctorRequest: FamilyDoctorRequest) => {
        this.getUserByPatientId(familyDoctorRequest.patient)
          .pipe(takeUntil(this._componentDestroy$))
          .subscribe((user: User) => {
            familyDoctorRequest.patient.lastName = user.lastName;
            familyDoctorRequest.patient.firstName = user.firstName;
          });
      });

      this.dataSource.data = familyDoctorRequests;
      this.dataSource.paginator = this.paginator;
    });
  }

  getUserByPatientId(patient: Patient): Observable<User> {
    return this.usersRegisteredAsPatientsList$.pipe(
      map((users: User[]) => users.find((user: User) => user.patient.cnp === patient.cnp)),
      filter((user: User | undefined): user is User => user !== undefined)
    );
  }

  onAccept(familyDoctorRequest: FamilyDoctorRequest) {
    this.familyDoctorRequestService.acceptRequest(familyDoctorRequest).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(request =>
          request.patient !== familyDoctorRequest.patient && request.familyDoctor !== familyDoctorRequest.familyDoctor
        );
        this.handleErrorService.handleSuccess('Successfully accepted request');
      },
      error: (error: CustomErrorResponse) => {
        this.handleErrorService.handleError(error);
      }
    });
  }

  onDecline(familyDoctorRequest: FamilyDoctorRequest) {
    this.familyDoctorRequestService.declineRequest(familyDoctorRequest).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(request =>
          request.patient !== familyDoctorRequest.patient && request.familyDoctor !== familyDoctorRequest.familyDoctor
        );
        this.handleErrorService.handleSuccess('Successfully declined request');
      },
      error: (error: CustomErrorResponse) => {
        this.handleErrorService.handleError(error);
      }
    });
  }
}
