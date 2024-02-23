import { Injectable } from '@angular/core';
import {RegisterResourceService} from "./register-resource.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private registerResourceService : RegisterResourceService
  ) { }
}
