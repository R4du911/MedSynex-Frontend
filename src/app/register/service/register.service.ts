import { Injectable } from '@angular/core';
import {RegisterResourceService} from "./register-resource.service";
import {RegisterRequest} from "../model/register-request";
import {Observable} from "rxjs";
import {LoginResponse} from "../../login/model/login-response";
import {Laboratory} from "../../laboratory/model/laboratory";
import {HttpResponse} from "@angular/common/http";
import {RegisterAsDoctorRequest} from "../model/register-as-doctor-request";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private registerResourceService : RegisterResourceService
  ) { }

  register(registerRequest: RegisterRequest): Observable<LoginResponse> {
    return this.registerResourceService.register(registerRequest);
  }

  registerInfoDoctor(username: string, registerAsDoctorRequest: RegisterAsDoctorRequest) : Observable<HttpResponse<string>> {
    return this.registerResourceService.registerInfoDoctor(username, registerAsDoctorRequest);
  }

  registerInfoLaboratory(username: string, laboratory: Laboratory) : Observable<HttpResponse<string>> {
    return this.registerResourceService.registerInfoLaboratory(username,laboratory);
  }

}
