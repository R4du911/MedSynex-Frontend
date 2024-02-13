import {Component} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {LoginRequest} from "../../model/login-request";
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {AuthenticationService} from "../../../core/authentication/service/authentication.service";
import {LoginResponse} from "../../model/login-response";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: UntypedFormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private authenticationService: AuthenticationService
  ) {
    this.loginForm = this.setUpForm();
  }

  onLoginClicked() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;


    const loginRequest = new LoginRequest(username, password);
    this.loginService.login(loginRequest).subscribe(
      (loginResponse: LoginResponse) => {
        sessionStorage.setItem('token', loginResponse.accessToken);

        this.authenticationService.setCurrentUser(this.authenticationService.getLoggedInUsername());
        this.router.navigate(['home']);

      }
    );
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
