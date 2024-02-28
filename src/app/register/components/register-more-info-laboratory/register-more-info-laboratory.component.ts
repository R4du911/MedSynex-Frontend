import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../service/register.service";
import {LaboratoryService} from "../../../laboratory/service/laboratory.service";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";
import {Observable, Subject, take, takeUntil} from "rxjs";
import {Laboratory} from "../../../laboratory/model/laboratory";
import {AuthenticationService} from "../../../core/authentication/service/authentication.service";
import {CustomErrorResponse} from "../../../utils/error-handling/model/custom-error-response";
import {CanComponentDeactivate} from "../../../utils/deactivate.guard";

@Component({
  selector: 'app-register-more-info-laboratory',
  templateUrl: './register-more-info-laboratory.component.html',
  styleUrls: ['./register-more-info-laboratory.component.css']
})
export class RegisterMoreInfoLaboratoryComponent implements OnInit, OnDestroy, CanComponentDeactivate{
  registerLaboratoryForm: UntypedFormGroup;

  laboratoryList$: Observable<Laboratory[]> = new Observable<Laboratory[]>();
  private _componentDestroy$ = new Subject<void>;

  private isFormSubmitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private laboratoryService: LaboratoryService,
    private authenticationService: AuthenticationService,
    private handleErrorService: HandleErrorService
  ) {
    this.registerLaboratoryForm = this.setupForm();
  }

  canDeactivate(): boolean {
    return this.isFormSubmitted || !this.authenticationService.isLoggedIn();
  }


  ngOnInit() {
    this.laboratoryService.loadLaboratories().pipe(take(1)).subscribe();
    this.laboratoryList$ = this.laboratoryService.getLaboratories();
  }

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  compareObjects(o1: Laboratory, o2: Laboratory): boolean {
    return o1.id === o2.id && o1.name === o2.name;
  }

  onSubmitClicked() {
    const laboratory = this.registerLaboratoryForm.get('laboratory')?.value;
    const username = this.authenticationService.getLoggedInUsername();

    if(username !== null) {
      this.registerService.registerInfoLaboratory(username, laboratory)
        .pipe(takeUntil(this._componentDestroy$))
        .subscribe(
          () => {
            this.authenticationService.firstLogin = false;
            this.isFormSubmitted = true;

            this.router.navigate(['home']);
            this.handleErrorService.handleSuccess("Successfully registered as an employee of the laboratory "
              + laboratory.name);
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
      laboratory: ['', Validators.required]
    });
  }

  getErrorMessageLaboratory() {
    if(this.registerLaboratoryForm.get('laboratory')!.hasError('required')) {
      return 'Laboratory is required';
    }

    return '';
  }

}
