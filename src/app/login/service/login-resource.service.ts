import { Injectable } from '@angular/core';
import {LoginRequest} from "../model/login-request";
import {LoginResponse} from "../model/login-response";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginResourceService {
  url: string = 'http://localhost:8080/auth/login';

  constructor(
    private http: HttpClient
  ) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url, loginRequest);
  }

}
