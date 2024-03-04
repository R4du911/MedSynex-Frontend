import { Injectable } from '@angular/core';
import {RegisterResourceService} from "./register-resource.service";
import {RegisterRequest} from "../model/register-request";
import {Observable} from "rxjs";
import {LoginResponse} from "../../login/model/login-response";
import {Laboratory} from "../../laboratory/model/laboratory";
import {HttpResponse} from "@angular/common/http";
import {RegisterAsDoctorRequest} from "../model/register-as-doctor-request";
import {Dispensary} from "../../dispensary/model/dispensary";

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

  registerInfoFamilyDoctor(username: string, dispensary: Dispensary) : Observable<HttpResponse<string>> {
    return this.registerResourceService.registerInfoFamilyDoctor(username, dispensary);
  }

  registerInfoDoctor(username: string, registerAsDoctorRequest: RegisterAsDoctorRequest) : Observable<HttpResponse<string>> {
    return this.registerResourceService.registerInfoDoctor(username, registerAsDoctorRequest);
  }

  registerInfoLaboratory(username: string, laboratory: Laboratory) : Observable<HttpResponse<string>> {
    return this.registerResourceService.registerInfoLaboratory(username,laboratory);
  }

}
