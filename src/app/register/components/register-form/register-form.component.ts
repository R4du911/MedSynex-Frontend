import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../core/authentication/service/authentication.service";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";
import {RegisterService} from "../../service/register.service";
import * as CryptoJS from "crypto-js";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnDestroy{
  registerForm: UntypedFormGroup;
  private key: string = '1234567890123456';

  private _componentDestroy$ = new Subject<void>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private authenticationService: AuthenticationService,
    private handleErrorService: HandleErrorService
  ) {
    this.registerForm = this.setupForm();
  }

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  onRegisterClicked() {
    const firstname = this.registerForm.get('firstname')?.value;
    const lastname = this.registerForm.get('lastname')?.value;
    const username = this.registerForm.get('username')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    const encryptedPassword = this.encrypt(this.key, password);
  }

  private setupForm() {
    return this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  getErrorMessageFirstName() {
    if(this.registerForm.get('firstname')!.hasError('required')) {
      return 'First name is required';
    }

    return '';
  }

  getErrorMessageLastName() {
    if(this.registerForm.get('lastname')!.hasError('required')) {
      return 'Last name is required';
    }

    return '';
  }

  getErrorMessageUsername() {
    if(this.registerForm.get('username')!.hasError('required')) {
      return 'Username is required';
    }

    return '';
  }

  getErrorMessageEmail() {
    if(this.registerForm.get('email')!.hasError('required')) {
      return 'Email is required';
    }

    return '';
  }

  getErrorMessageRole() {
    if(this.registerForm.get('role')!.hasError('required')) {
      return 'Role is required';
    }

    return '';
  }

  getErrorMessagePassword() {
    if(this.registerForm.get('password')!.hasError('required')) {
      return 'Password is required';
    }

    return '';
  }

  getErrorMessageRepeatPassword() {
    if(this.registerForm.get('repeatPassword')!.hasError('required')) {
      return 'Repeating the password is required';
    }

    return '';
  }

  encrypt(key: any, value: string) {
    key = CryptoJS.enc.Utf8.parse(key);
    return CryptoJS.AES.encrypt(value, key, { iv: key }).toString();
  }

}
