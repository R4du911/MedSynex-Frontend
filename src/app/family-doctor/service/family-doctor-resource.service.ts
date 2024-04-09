import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Dispensary} from "../../dispensary/model/dispensary";
import {Observable} from "rxjs";
import {FamilyDoctor} from "../model/family-doctor";
import {Patient} from "../../patient/model/patient";

@Injectable({
  providedIn: 'root'
})
export class FamilyDoctorResourceService {
  url: string = 'http://localhost:8080/family-doctor/';

  constructor(
    private http: HttpClient
  ) { }

  loadFamilyDoctorsFromAGivenDispensary(dispensary: Dispensary) : Observable<FamilyDoctor[]> {
    return this.http.post<FamilyDoctor[]>(this.url + 'get-by-dispensary', dispensary);
  }

  loadAllPatientsRegisteredAtAGivenFamilyDoctor(username: string) : Observable<Patient[]> {
    return this.http.get<Patient[]>(this.url + 'patients/' + username);
  }

}
