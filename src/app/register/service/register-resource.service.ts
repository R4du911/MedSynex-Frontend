import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterResourceService {

  constructor(
    private http: HttpClient
  ) { }
}
