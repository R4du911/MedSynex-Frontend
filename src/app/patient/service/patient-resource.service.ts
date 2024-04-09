import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FamilyDoctor} from "../../family-doctor/model/family-doctor";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientResourceService {
  url: string = 'http://localhost:8080/patient/';

  constructor(
    private http: HttpClient
  ) { }

  getRegisteredFamilyDoctorOfGivenPatient(username: string) : Observable<FamilyDoctor> {
    return this.http.get<FamilyDoctor>(this.url + 'family-doctor/' + username);
  }
}
