import { Injectable } from '@angular/core';
import {PatientResourceService} from "./patient-resource.service";
import {Observable} from "rxjs";
import {FamilyDoctor} from "../../family-doctor/model/family-doctor";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private patientResourceService: PatientResourceService
  ) { }

  getRegisteredFamilyDoctorOfGivenPatient(username: string): Observable<FamilyDoctor> {
    return this.patientResourceService.getRegisteredFamilyDoctorOfGivenPatient(username);
  }
}
