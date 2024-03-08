import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {RegisterRequest} from "../model/register-request";
import {Observable} from "rxjs";
import {LoginResponse} from "../../login/model/login-response";
import {Laboratory} from "../../laboratory/model/laboratory";
import {RegisterAsDoctorRequest} from "../model/register-as-doctor-request";
import {Dispensary} from "../../dispensary/model/dispensary";
import {RegisterAsPatientRequest} from "../model/register-as-patient-request";

@Injectable({
  providedIn: 'root'
})
export class RegisterResourceService {
  url: string = 'http://localhost:8080/user/register';

  constructor(
    private http: HttpClient
  ) { }

  register(registerRequest: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url, registerRequest);
  }

  registerInfoPatient(username: string, registerAsPatientRequest: RegisterAsPatientRequest) : Observable<HttpResponse<string>> {
    return this.http.post<HttpResponse<string>>(this.url + '/patient/' + username, registerAsPatientRequest);
  }

  registerInfoFamilyDoctor(username: string, dispensary: Dispensary) : Observable<HttpResponse<string>> {
    return this.http.post<HttpResponse<string>>(this.url + '/family-doctor/' + username, dispensary);
  }

  registerInfoDoctor(username: string, registerAsDoctorRequest: RegisterAsDoctorRequest) : Observable<HttpResponse<string>> {
    return this.http.post<HttpResponse<string>>(this.url + '/doctor/' + username, registerAsDoctorRequest);
  }

  registerInfoLaboratory(username: string, laboratory: Laboratory) : Observable<HttpResponse<string>> {
    return this.http.post<HttpResponse<string>>(this.url + '/laboratory/' + username, laboratory);
  }

}
