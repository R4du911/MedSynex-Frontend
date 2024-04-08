import { Injectable } from '@angular/core';
import {FamilyDoctorRequestResourceService} from "./family-doctor-request-resource.service";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {FamilyDoctorRequest} from "../model/family-doctor-request";
import {FamilyDoctor} from "../../family-doctor/model/family-doctor";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FamilyDoctorRequestService {
  familyDoctorRequestList$: BehaviorSubject<FamilyDoctorRequest[]> = new BehaviorSubject<FamilyDoctorRequest[]>([]);

  constructor(
    private familyDoctorRequestResourceService: FamilyDoctorRequestResourceService
  ) { }

  getFamilyDoctorRequests() : Observable<FamilyDoctorRequest[]> {
    return this.familyDoctorRequestList$.asObservable();
  }

  loadAllFamilyDoctorRequestForAGivenFamilyDoctor(username: string) : Observable<FamilyDoctorRequest[]> {
    return this.familyDoctorRequestResourceService.loadAllFamilyDoctorRequestForAGivenFamilyDoctor(username)
      .pipe(tap((familyDoctorRequests: FamilyDoctorRequest[]) => this.familyDoctorRequestList$.next(familyDoctorRequests)));
  }

  loadAllFamilyDoctorRequestForAGivenPatient(username: string) : Observable<FamilyDoctorRequest[]> {
    return this.familyDoctorRequestResourceService.loadAllFamilyDoctorRequestForAGivenPatient(username)
      .pipe(tap((familyDoctorRequests: FamilyDoctorRequest[]) => this.familyDoctorRequestList$.next(familyDoctorRequests)));
  }

  makeAFamilyDoctorRequest(username: string, selectedFamilyDoctor: FamilyDoctor) : Observable<HttpResponse<string>> {
    return this.familyDoctorRequestResourceService.makeAFamilyDoctorRequest(username, selectedFamilyDoctor);
  }

  acceptRequest(familyDoctorRequest: FamilyDoctorRequest) : Observable<HttpResponse<string>> {
    return this.familyDoctorRequestResourceService.acceptRequest(familyDoctorRequest);
  }

  declineRequest(familyDoctorRequest: FamilyDoctorRequest) : Observable<HttpResponse<string>> {
    return this.familyDoctorRequestResourceService.declineRequest(familyDoctorRequest);
  }
}
