import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, take, takeUntil} from "rxjs";
import {Hospital} from "../../../hospital/model/hospital";
import {Specialization} from "../../../specialization/model/specialization";
import {Router} from "@angular/router";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../service/register.service";
import {HospitalService} from "../../../hospital/service/hospital.service";
import {SpecializationService} from "../../../specialization/service/specialization.service";
import {AuthenticationService} from "../../../core/authentication/service/authentication.service";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";
import {CanComponentDeactivate} from "../../../utils/deactivate.guard";
import {RegisterAsDoctorRequest} from "../../model/register-as-doctor-request";
import {CustomErrorResponse} from "../../../utils/error-handling/model/custom-error-response";

@Component({
  selector: 'app-register-more-info-doctor',
  templateUrl: './register-more-info-doctor.component.html',
  styleUrls: ['./register-more-info-doctor.component.css']
})
export class RegisterMoreInfoDoctorComponent implements OnInit, OnDestroy, CanComponentDeactivate{
  registerDoctorForm: UntypedFormGroup;

  hospitalList$: Observable<Hospital[]> = new Observable<Hospital[]>();
  specializationList$: Observable<Specialization[]> = new Observable<Specialization[]>();
  private _componentDestroy$ = new Subject<void>;

  private isFormSubmitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private hospitalService: HospitalService,
    private specializationService: SpecializationService,
    private authenticationService: AuthenticationService,
    private handleErrorService: HandleErrorService
  ) {
    this.registerDoctorForm = this.setupForm();
  }

  canDeactivate(): boolean {
    return this.isFormSubmitted || !this.authenticationService.isLoggedIn();
  }

  ngOnInit() {
    this.hospitalService.loadHospitals().pipe(take(1)).subscribe();
    this.specializationService.loadSpecializations().pipe(take(1)).subscribe();

    this.hospitalList$ = this.hospitalService.getHospitals();
    this.specializationList$ = this.specializationService.getSpecializations();
  }

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  compareHospital(obj1 : Hospital, obj2 : Hospital) : boolean {
    return obj1.id === obj2.id && obj1.name === obj2.name;
  }

  compareSpecialization(obj1 : Specialization, obj2 : Specialization) : boolean {
    return obj1.id === obj2.id && obj1.name === obj2.name;
  }

  onSubmitClicked() {
    const hospital = this.registerDoctorForm.get('hospital')?.value;
    const specialization = this.registerDoctorForm.get('specialization')?.value;
    const username = this.authenticationService.getLoggedInUsername();

    if(username !== null){
      const registerAsDoctorRequest = new RegisterAsDoctorRequest(hospital, specialization);
      this.registerService.registerInfoDoctor(username, registerAsDoctorRequest)
        .pipe(takeUntil(this._componentDestroy$))
        .subscribe(
          () => {
            this.authenticationService.firstLogin = false;
            this.isFormSubmitted = true;

            this.router.navigate(['home']);
            this.handleErrorService.handleSuccess("Successfully registered as a doctor working at the hospital "
              + hospital.name + " and having the specialization " + specialization.name);
          },
          (error: CustomErrorResponse) => {
            this.handleErrorService.handleError(error);
          }
        )

    }
    else {
      this.handleErrorService.handleError({ errorCode: "INVALID_USER", message: "User is invalid" });
    }

  }

  private setupForm() {
    return this.fb.group({
      hospital: ['', Validators.required],
      specialization: ['', Validators.required]
    });
  }

  getErrorMessageHospital() {
    if(this.registerDoctorForm.get('hospital')!.hasError('required')) {
      return 'Hospital is required';
    }

    return '';
  }

  getErrorMessageSpecialization() {
    if(this.registerDoctorForm.get('specialization')!.hasError('required')) {
      return 'Specialization is required';
    }

    return '';
  }

}
