import {Component, OnDestroy, OnInit} from '@angular/core';
import {CanComponentDeactivate} from "../../../utils/deactivate.guard";
import {Router} from "@angular/router";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../service/register.service";
import {DispensaryService} from "../../../dispensary/service/dispensary.service";
import {FamilyDoctorService} from "../../../family-doctor/service/family-doctor.service";
import {AuthenticationService} from "../../../core/authentication/service/authentication.service";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";
import {
  filter,
  map,
  Observable,
  Subject,
  take,
  takeUntil,
} from "rxjs";
import {Dispensary} from "../../../dispensary/model/dispensary";
import {User} from "../../../user/model/user";
import {UserService} from "../../../user/service/user.service";
import {FamilyDoctor} from "../../../family-doctor/model/family-doctor";
import {RegisterAsPatientRequest} from "../../model/register-as-patient-request";
import {CustomErrorResponse} from "../../../utils/error-handling/model/custom-error-response";

@Component({
  selector: 'app-register-more-info-patient',
  templateUrl: './register-more-info-patient.component.html',
  styleUrls: ['./register-more-info-patient.component.css']
})
export class RegisterMoreInfoPatientComponent implements OnInit, OnDestroy, CanComponentDeactivate{
  registerPatientForm: UntypedFormGroup;

  dispensaryList$: Observable<Dispensary[]> = new Observable<Dispensary[]>();
  familyDoctorsFromAGivenDispensaryList$: Observable<FamilyDoctor[]> = new Observable<FamilyDoctor[]>();
  usersRegisteredAsFamilyDoctorsList$: Observable<User[]> = new Observable<User[]>();

  private _componentDestroy$ = new Subject<void>;

  private isFormSubmitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private dispensaryService: DispensaryService,
    private familyDoctorService: FamilyDoctorService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private handleErrorService: HandleErrorService
  ) {
    this.registerPatientForm = this.setupForm();
  }

  canDeactivate(): boolean {
    return this.isFormSubmitted || !this.authenticationService.isLoggedIn();
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

  compareFamilyDoctors(obj1: FamilyDoctor, obj2: FamilyDoctor) {
    return obj1.id === obj2.id && obj1.dispensary === obj2.dispensary && obj1.nrPatients === obj2.nrPatients;
  }

  compareDispensaries(obj1: Dispensary, obj2: Dispensary) {
    return obj1.id === obj2.id && obj1.name === obj2.name;
  }

  onSubmitClicked() {
    const cnp = this.registerPatientForm.get('cnp')?.value;
    const selectedFamilyDoctor = this.registerPatientForm.get('familyDoctor')?.value;
    const username = this.authenticationService.getLoggedInUsername();

    if(username !== null) {
      const registerAsPatientRequest = new RegisterAsPatientRequest(cnp, selectedFamilyDoctor);
      this.registerService.registerInfoPatient(username, registerAsPatientRequest)
        .pipe(takeUntil(this._componentDestroy$))
        .subscribe(() => {
          this.authenticationService.firstLogin = false;
          this.isFormSubmitted = true;

          this.router.navigate(['home']);
          this.handleErrorService.handleSuccess("Successfully registered as a patient with CNP " + cnp);
          this.handleErrorService.handleSuccess("Successfully send a family doctor request to " +
            selectedFamilyDoctor.lastName + ", " + selectedFamilyDoctor.firstName);
        },
          (error: CustomErrorResponse) => {
            this.handleErrorService.handleError(error);
          }
        )

    } else {
      this.handleErrorService.handleError({ errorCode: "INVALID_USER", message: "User is invalid" });
    }
  }

  setupForm() {
    return this.fb.group({
      cnp: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      dispensary: ['', Validators.required],
      familyDoctor: [{value: '', disabled: true}, Validators.required]
    })
  }

  dispensaryFieldIsChanged() {
    this.registerPatientForm.get('dispensary')?.valueChanges
      .pipe(takeUntil(this._componentDestroy$))
      .subscribe(dispensary => {
        this.registerPatientForm.get('familyDoctor')?.reset();

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

        this.registerPatientForm.get('familyDoctor')?.enable();
      });
  }

  getUserByFamilyDoctorId(familyDoctor: FamilyDoctor): Observable<User> {
    return this.usersRegisteredAsFamilyDoctorsList$.pipe(
      map((users: User[]) => users.find((user: User) => user?.familyDoctor?.id === familyDoctor?.id)),
      filter((user: User | undefined): user is User => user !== undefined)
    );
  }


  getErrorMessageCNP() {
    if(this.registerPatientForm.get('cnp')!.hasError('required')) {
      return 'CNP is required';
    }

    if (this.registerPatientForm.get('cnp')!.hasError('pattern')) {
      return 'Can only contain digits and must be 13 characters';
    }

    return '';
  }

  getErrorMessageDispensary() {
    if(this.registerPatientForm.get('dispensary')!.hasError('required')) {
      return 'Dispensary is required';
    }

    return '';
  }

  getErrorMessageFamilyDoctor() {
    if(this.registerPatientForm.get('familyDoctor')!.hasError('required')) {
      return 'Family Doctor is required';
    }

    return '';
  }

}
