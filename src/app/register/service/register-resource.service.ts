import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../model/register-request";
import {Observable} from "rxjs";
import {LoginResponse} from "../../login/model/login-response";

@Injectable({
  providedIn: 'root'
})
export class RegisterResourceService {
  url: string = 'http://localhost:8080/user/';

  constructor(
    private http: HttpClient
  ) { }

  register(registerRequest: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + 'register', registerRequest);
  }

}
