import { Injectable } from '@angular/core';
import {RegisterResourceService} from "./register-resource.service";
import {RegisterRequest} from "../model/register-request";
import {Observable} from "rxjs";
import {LoginResponse} from "../../login/model/login-response";

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

}
