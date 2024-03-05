import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {RegisterRequest} from "../model/register-request";
import {Observable} from "rxjs";
import {LoginResponse} from "../../login/model/login-response";
import {Laboratory} from "../../laboratory/model/laboratory";
import {RegisterAsDoctorRequest} from "../model/register-as-doctor-request";
import {Dispensary} from "../../dispensary/model/dispensary";

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

  registerInfoFamilyDoctor(username: string, dispensary: Dispensary) : Observable<HttpResponse<string>> {
    return this.http.post<HttpResponse<string>>(this.url + 'register/family-doctor/' + username, dispensary);
  }

  registerInfoDoctor(username: string, registerAsDoctorRequest: RegisterAsDoctorRequest) : Observable<HttpResponse<string>> {
    return this.http.post<HttpResponse<string>>(this.url + 'register/doctor/' + username, registerAsDoctorRequest);
  }

  registerInfoLaboratory(username: string, laboratory: Laboratory) : Observable<HttpResponse<string>> {
    return this.http.post<HttpResponse<string>>(this.url + 'register/laboratory/' + username, laboratory);
  }

}
