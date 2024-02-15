import { Injectable } from '@angular/core';
import {LoginRequest} from "../model/login-request";
import {LoginResponse} from "../model/login-response";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RefreshTokenResponse} from "../model/refresh-token-response";

@Injectable({
  providedIn: 'root'
})
export class LoginResourceService {
  url: string = 'http://localhost:8080/auth/';

  constructor(
    private http: HttpClient
  ) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + 'login', loginRequest);
  }

  refreshToken() : Observable<RefreshTokenResponse> {
    return this.http.get<RefreshTokenResponse>(this.url + 'refreshToken');
  }

}
