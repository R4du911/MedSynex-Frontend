import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {FamilyDoctorRequest} from "../model/family-doctor-request";
import {FamilyDoctor} from "../../family-doctor/model/family-doctor";

@Injectable({
  providedIn: 'root'
})
export class FamilyDoctorRequestResourceService {
  url: string = 'http://localhost:8080/family-doctor-request/';

  constructor(
    private http: HttpClient
  ) { }

  loadAllFamilyDoctorRequestForAGivenFamilyDoctor(username: string) : Observable<FamilyDoctorRequest[]> {
    return this.http.get<FamilyDoctorRequest[]>(this.url + "family-doctor/" + username);
  }

  loadAllFamilyDoctorRequestForAGivenPatient(username: string) : Observable<FamilyDoctorRequest[]> {
    return this.http.get<FamilyDoctorRequest[]>(this.url + "patient/" + username);
  }

  makeAFamilyDoctorRequest(username: string, selectedFamilyDoctor: FamilyDoctor) : Observable<HttpResponse<string>> {
    return this.http.post<HttpResponse<string>>(this.url + "make/" + username, selectedFamilyDoctor);
  }

  acceptRequest(familyDoctorRequest: FamilyDoctorRequest) : Observable<HttpResponse<string>> {
    return this.http.post<HttpResponse<string>>(this.url + 'accept', familyDoctorRequest);
  }

  declineRequest(familyDoctorRequest: FamilyDoctorRequest) : Observable<HttpResponse<string>> {
    return this.http.post<HttpResponse<string>>(this.url + 'decline', familyDoctorRequest);
  }

}
