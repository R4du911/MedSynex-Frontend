import {Component, OnDestroy} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../core/authentication/service/authentication.service";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";
import {RegisterService} from "../../service/register.service";
import {ERoleMapping} from "../../../core/authorization/model/ERoleMapping";
import * as CryptoJS from "crypto-js";
import {ERole} from "../../../core/authorization/model/ERole";
import {RegisterRequest} from "../../model/register-request";
import {LoginResponse} from "../../../login/model/login-response";
import {CustomErrorResponse} from "../../../utils/error-handling/model/custom-error-response";
import {AuthorizationService} from "../../../core/authorization/service/authorization.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnDestroy {
  registerForm: UntypedFormGroup;
  private key: string = '1234567890123456';
  protected roleList: ERole[] = [ERole.Patient, ERole.FamilyDoctor, ERole.Doctor, ERole.Laboratory];

  protected readonly ERoleMapping = ERoleMapping;
  private _componentDestroy$ = new Subject<void>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private handleErrorService: HandleErrorService
  ) {
    this.registerForm = this.setupForm();
  }

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  compareObjects(o1: ERole, o2: ERole): boolean {
    return o1 === o2;
  }

  onRegisterClicked() {
    const firstname = this.registerForm.get('firstname')?.value;
    const lastname = this.registerForm.get('lastname')?.value;
    const username = this.registerForm.get('username')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const role = this.registerForm.get('role')?.value;

    const encryptedPassword = this.encrypt(this.key, password);

    const registerRequest: RegisterRequest = new RegisterRequest(firstname, lastname, username, email, encryptedPassword, role);
    this.registerService.register(registerRequest)
      .pipe(takeUntil(this._componentDestroy$))
      .subscribe((loginResponse: LoginResponse) => {
          sessionStorage.setItem('token', loginResponse.accessToken);

          this.authenticationService.firstLogin = loginResponse.firstLogin;
          this.authenticationService.setCurrentUser(this.authenticationService.getLoggedInUsername());
          const userRole : ERole[] = this.authorizationService.getUserRoles();

          if(this.authenticationService.firstLogin){
            if(userRole.includes(ERole.Patient))
              this.router.navigate(['register-patient']);

            if(userRole.includes(ERole.FamilyDoctor))
              this.router.navigate(['register-family-doctor']);

            if(userRole.includes(ERole.Doctor))
              this.router.navigate(['register-doctor']);

            if(userRole.includes(ERole.Laboratory))
              this.router.navigate(['register-laboratory']);
          } else {
            this.router.navigate(['home']);
          }
        },
        (error: CustomErrorResponse) => {
          this.handleErrorService.handleError(error);
        }
      );
  }

  private setupForm() {
    return this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]+$')]],
      username: ['', [Validators.required, this.noWhiteSpaceValidator(), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.pattern(
        '^[a-zA-Z0-9]+[-]?[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+[-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\\.[a-zA-Z]+)+$'
      )]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\\-_+.]).{8,}$'
      ), this.noWhiteSpaceValidator()]],
      repeatPassword: ['', [Validators.required]]
    }, {validators: this.passwordMatchValidator()});
  }

  noWhiteSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhiteSpace = /\s/.test(control.value);

      return isWhiteSpace ? {whiteSpace: true} : null;
    };
  }

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get('password');
      const repeatPasswordControl = formGroup.get('repeatPassword');

      if (!passwordControl || !repeatPasswordControl) {
        return null;
      }

      if (repeatPasswordControl.errors && !repeatPasswordControl.hasError('passwordMismatch')) {
        return null;
      }

      if (passwordControl.value !== repeatPasswordControl.value) {
        repeatPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        repeatPasswordControl.setErrors(null);
        return null;
      }
    };
  }


  getErrorMessageFirstName() {
    if (this.registerForm.get('firstname')!.hasError('required')) {
      return 'First name is required';
    }

    if (this.registerForm.get('firstname')!.hasError('pattern')) {
      return 'First name can only contain letters';
    }

    return '';
  }

  getErrorMessageLastName() {
    if (this.registerForm.get('lastname')!.hasError('required')) {
      return 'Last name is required';
    }

    if (this.registerForm.get('lastname')!.hasError('pattern')) {
      return 'Last name can only contain letters';
    }

    return '';
  }

  getErrorMessageUsername() {
    if (this.registerForm.get('username')!.hasError('required')) {
      return 'Username is required';
    }

    if (this.registerForm.get('username')!.hasError('whiteSpace')) {
      return 'Can not contain white spaces';
    }

    if (this.registerForm.get('username')!.hasError('maxlength')) {
      return 'Not more than 15 characters long';
    }

    return '';
  }

  getErrorMessageEmail() {
    if (this.registerForm.get('email')!.hasError('required')) {
      return 'Email is required';
    }

    if (this.registerForm.get('email')!.hasError('pattern')) {
      return 'Invalid email format';
    }

    return '';
  }

  getErrorMessageRole() {
    if (this.registerForm.get('role')!.hasError('required')) {
      return 'Role is required';
    }

    return '';
  }

  getErrorMessagePassword() {
    if (this.registerForm.get('password')!.hasError('required')) {
      return 'Password is required';
    }

    if (this.registerForm.get('password')!.hasError('pattern')) {
      return 'Password must be at least 8 characters long and include at least one letter, ' +
        'one number, and one special character';
    }

    if (this.registerForm.get('password')!.hasError('whiteSpace')) {
      return 'Can not contain white spaces';
    }

    return '';
  }

  getErrorMessageRepeatPassword() {
    if (this.registerForm.get('repeatPassword')!.hasError('required')) {
      return 'Confirming password is required';
    }

    if (this.registerForm.get('repeatPassword')!.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }

    return '';
  }

  encrypt(key: any, value: string) {
    key = CryptoJS.enc.Utf8.parse(key);
    return CryptoJS.AES.encrypt(value, key, {iv: key}).toString();
  }

}
