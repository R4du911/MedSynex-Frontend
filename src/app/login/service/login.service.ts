import { Injectable } from '@angular/core';
import {LoginRequest} from "../model/login-request";
import {Observable} from "rxjs";
import {LoginResponse} from "../model/login-response";
import {LoginResourceService} from "./login-resource.service";
import {RefreshTokenResponse} from "../model/refresh-token-response";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private loginResourceService: LoginResourceService
  ) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.loginResourceService.login(loginRequest);
  }

  refreshToken() : Observable<RefreshTokenResponse> {
    return this.loginResourceService.refreshToken();
  }

}
