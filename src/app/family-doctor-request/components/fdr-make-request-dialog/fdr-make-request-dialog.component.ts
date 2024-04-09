import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {filter, map, Observable, Subject, take, takeUntil} from "rxjs";
import {Dispensary} from "../../../dispensary/model/dispensary";
import {FamilyDoctor} from "../../../family-doctor/model/family-doctor";
import {User} from "../../../user/model/user";
import {DispensaryService} from "../../../dispensary/service/dispensary.service";
import {UserService} from "../../../user/service/user.service";
import {FamilyDoctorService} from "../../../family-doctor/service/family-doctor.service";
import {CustomErrorResponse} from "../../../utils/error-handling/model/custom-error-response";
import {FamilyDoctorRequestService} from "../../service/family-doctor-request.service";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";

@Component({
  selector: 'app-fdr-make-request-dialog',
  templateUrl: './fdr-make-request-dialog.component.html',
  styleUrls: ['./fdr-make-request-dialog.component.css']
})
export class FdrMakeRequestDialogComponent implements OnInit, OnDestroy{
  makeRequestForm: UntypedFormGroup;

  dispensaryList$: Observable<Dispensary[]> = new Observable<Dispensary[]>();
  familyDoctorsFromAGivenDispensaryList$: Observable<FamilyDoctor[]> = new Observable<FamilyDoctor[]>();
  usersRegisteredAsFamilyDoctorsList$: Observable<User[]> = new Observable<User[]>();

  private _componentDestroy$ = new Subject<void>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FdrMakeRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public username: string,
    private dispensaryService: DispensaryService,
    private userService: UserService,
    private familyDoctorService: FamilyDoctorService,
    private familyDoctorRequestService: FamilyDoctorRequestService,
    private handleErrorService: HandleErrorService
  ) {
    this.makeRequestForm = this.setupForm();
  }

  ngOnInit() {
    this.dispensaryService.loadDispensaries().pipe(take(1)).subscribe();
    this.userService.loadUsersWhichAreRegisteredAsFamilyDoctors().pipe(take(1)).subscribe();

    this.dispensaryList$ = this.dispensaryService.getDispensaries();
    this.usersRegisteredAsFamilyDoctorsList$ = this.userService.getUsersWhichAreRegisteredAsWantedRole();

    this.dispensaryFieldIsChanged();
  }

  ngOnDestroy() {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  setupForm() {
    return this.fb.group({
      dispensary: ['', Validators.required],
      familyDoctor: [{value: '', disabled: true}, Validators.required]
    })
  }

  compareFamilyDoctors(obj1: FamilyDoctor, obj2: FamilyDoctor) {
    return obj1?.id === obj2?.id && obj1.dispensary === obj2.dispensary && obj1.nrPatients === obj2.nrPatients;
  }

  compareDispensaries(obj1: Dispensary, obj2: Dispensary) {
    return obj1.id === obj2.id && obj1.name === obj2.name;
  }

  dispensaryFieldIsChanged() {
    this.makeRequestForm.get('dispensary')?.valueChanges
      .pipe(takeUntil(this._componentDestroy$))
      .subscribe(dispensary => {
        this.makeRequestForm.get('familyDoctor')?.reset();

        this.familyDoctorService.loadFamilyDoctorFromAGivenDispensary(dispensary).pipe(take(1)).subscribe();
        this.familyDoctorsFromAGivenDispensaryList$ = this.familyDoctorService.getFamilyDoctorFromAGivenDispensary();

        this.familyDoctorsFromAGivenDispensaryList$
          .pipe(takeUntil(this._componentDestroy$))
          .subscribe((familyDoctors: FamilyDoctor[]) => {
            familyDoctors.forEach((familyDoctor: FamilyDoctor) => {
              this.getUserByFamilyDoctorId(familyDoctor)
                .pipe(takeUntil(this._componentDestroy$))
                .subscribe((user: User) => {
                  familyDoctor.lastName = user?.lastName;
                  familyDoctor.firstName = user?.firstName;
                });
            });
          });

        this.makeRequestForm.get('familyDoctor')?.enable();
      });
  }

  getUserByFamilyDoctorId(familyDoctor: FamilyDoctor): Observable<User> {
    return this.usersRegisteredAsFamilyDoctorsList$.pipe(
      map((users: User[]) => users.find((user: User) => user?.familyDoctor?.id === familyDoctor?.id)),
      filter((user: User | undefined): user is User => user !== undefined && user !== null)
    );
  }

  onDialogClose() : void {
    this.dialogRef.close();
  }

  onSave() {
    const selectedFamilyDoctor = this.makeRequestForm.get('familyDoctor')?.value;

    if(this.username !== '') {
      this.familyDoctorRequestService.makeAFamilyDoctorRequest(this.username, selectedFamilyDoctor)
        .pipe(takeUntil(this._componentDestroy$))
        .subscribe(() => {
            this.handleErrorService.handleSuccess("Successfully send a family doctor request to " +
              selectedFamilyDoctor.lastName + ", " + selectedFamilyDoctor.firstName);
            this.dialogRef.close();
            this.familyDoctorRequestService.loadAllFamilyDoctorRequestForAGivenPatient(this.username)
              .pipe(take(1)).subscribe();
          },
          (error: CustomErrorResponse) => {
            this.handleErrorService.handleError(error);
          }
        )

    } else {
      this.handleErrorService.handleError({ errorCode: "INVALID_USER", message: "User is invalid" });
    }
  }

  getErrorMessageDispensary() {
    if(this.makeRequestForm.get('dispensary')!.hasError('required')) {
      return 'Dispensary is required';
    }

    return '';
  }

  getErrorMessageFamilyDoctor() {
    if(this.makeRequestForm.get('familyDoctor')!.hasError('required')) {
      return 'Family Doctor is required';
    }

    return '';
  }
}
