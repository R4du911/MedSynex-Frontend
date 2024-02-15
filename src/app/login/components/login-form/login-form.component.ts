import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {LoginRequest} from "../../model/login-request";
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {AuthenticationService} from "../../../core/authentication/service/authentication.service";
import {LoginResponse} from "../../model/login-response";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";
import {CustomErrorResponse} from "../../../utils/error-handling/model/custom-error-response";
import * as CryptoJS from 'crypto-js';
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnDestroy{
  loginForm: UntypedFormGroup;
  private key: string = '1234567890123456';

  private _componentDestroy$ = new Subject<void>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private authenticationService: AuthenticationService,
    private handleErrorService: HandleErrorService,
  ) {
    this.loginForm = this.setUpForm();
  }

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  onLoginClicked() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    const encryptedPassword = this.encrypt(this.key, password);

    const loginRequest = new LoginRequest(username, encryptedPassword);
    this.loginService.login(loginRequest)
      .pipe(takeUntil(this._componentDestroy$))
      .subscribe(
      (loginResponse: LoginResponse) => {
        sessionStorage.setItem('token', loginResponse.accessToken);

        this.authenticationService.setCurrentUser(this.authenticationService.getLoggedInUsername());
        this.router.navigate(['home']);
        this.handleErrorService.handleSuccess("Successfully logged in");

      },
      (error: CustomErrorResponse) => {
        this.handleErrorService.handleError(error);
      }
    );
  }

  encrypt(key: any, value: string) {
    key = CryptoJS.enc.Utf8.parse(key);
    return CryptoJS.AES.encrypt(value, key, { iv: key }).toString();
  }

  setUpForm() {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getErrorMessageUsername() {
    if (this.loginForm.get('username')!.hasError('required')) {
      return "Username is required";
    }

    return '';
  }

  getErrorMessagePassword() {
    if (this.loginForm.get('password')!.hasError('required')) {
      return "Password is required";
    }

    return '';
  }

}
