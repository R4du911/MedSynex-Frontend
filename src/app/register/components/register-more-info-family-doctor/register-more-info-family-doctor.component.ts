import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Observable, Subject, take, takeUntil} from "rxjs";
import {Dispensary} from "../../../dispensary/model/dispensary";
import {Router} from "@angular/router";
import {RegisterService} from "../../service/register.service";
import {AuthenticationService} from "../../../core/authentication/service/authentication.service";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";
import {DispensaryService} from "../../../dispensary/service/dispensary.service";
import {CanComponentDeactivate} from "../../../utils/deactivate.guard";
import {CustomErrorResponse} from "../../../utils/error-handling/model/custom-error-response";

@Component({
  selector: 'app-register-more-info-family-doctor',
  templateUrl: './register-more-info-family-doctor.component.html',
  styleUrls: ['./register-more-info-family-doctor.component.css']
})
export class RegisterMoreInfoFamilyDoctorComponent implements OnInit, OnDestroy, CanComponentDeactivate{
  registerFamilyDoctorForm: UntypedFormGroup;

  dispensaryList$: Observable<Dispensary[]> = new Observable<Dispensary[]>();
  private _componentDestroy$ = new Subject<void>;

  private isFormSubmitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private dispensaryService: DispensaryService,
    private authenticationService: AuthenticationService,
    private handleErrorService: HandleErrorService
  ) {
    this.registerFamilyDoctorForm = this.setupForm();
  }

  canDeactivate(): boolean {
    return this.isFormSubmitted || !this.authenticationService.isLoggedIn();
  }

  ngOnInit() {
    this.dispensaryService.loadDispensaries().pipe(take(1)).subscribe();
    this.dispensaryList$ = this.dispensaryService.getDispensaries();
  }

  ngOnDestroy() {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  compareDispensary(obj1 : Dispensary, obj2: Dispensary) {
    return obj1.id === obj2.id && obj1.name === obj2.name;
  }

  onSubmitClicked() {
    const dispensary = this.registerFamilyDoctorForm.get('dispensary')?.value;
    const username = this.authenticationService.getLoggedInUsername();

    if(username !== null) {
      this.registerService.registerInfoFamilyDoctor(username, dispensary)
        .pipe(takeUntil(this._componentDestroy$))
        .subscribe(() => {
            this.authenticationService.firstLogin = false;
            this.isFormSubmitted = true;

            this.router.navigate(['home']);
            this.handleErrorService.handleSuccess("Successfully registered as a family doctor working at the dispensary "
              + dispensary.name);
          },
          (error: CustomErrorResponse) => {
            this.handleErrorService.handleError(error);
          }
        )
    } else {
      this.handleErrorService.handleError({ errorCode: "INVALID_USER", message: "User is invalid" });
    }

  }

  private setupForm() {
    return this.fb.group({
      dispensary: ['', Validators.required]
    });
  }

  getErrorMessageDispensary() {
    if(this.registerFamilyDoctorForm.get('dispensary')!.hasError('required')) {
      return 'Dispensary is required';
    }

    return '';
  }

}
