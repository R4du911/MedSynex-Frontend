import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {FamilyDoctor} from "../model/family-doctor";
import {FamilyDoctorResourceService} from "./family-doctor-resource.service";
import {Dispensary} from "../../dispensary/model/dispensary";
import {Patient} from "../../patient/model/patient";

@Injectable({
  providedIn: 'root'
})
export class FamilyDoctorService {
  familyDoctorsFromAGivenDispensaryList$: BehaviorSubject<FamilyDoctor[]> = new BehaviorSubject<FamilyDoctor[]>([]);
  patientRegisteredAtAGivenFamilyDoctor$: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([]);

  constructor(
    private familyDoctorResourceService: FamilyDoctorResourceService
  ) { }

  getFamilyDoctorFromAGivenDispensary() : Observable<FamilyDoctor[]> {
    return this.familyDoctorsFromAGivenDispensaryList$.asObservable();
  }

  getAllPatientsRegisteredAtAGivenFamilyDoctor() : Observable<Patient[]> {
    return this.patientRegisteredAtAGivenFamilyDoctor$.asObservable();
  }

  loadFamilyDoctorFromAGivenDispensary(dispensary: Dispensary) : Observable<FamilyDoctor[]> {
    return this.familyDoctorResourceService.loadFamilyDoctorsFromAGivenDispensary(dispensary)
      .pipe(tap((familyDoctors : FamilyDoctor[]) => this.familyDoctorsFromAGivenDispensaryList$.next(familyDoctors)));
  }

  loadAllPatientsRegisteredAtAGivenFamilyDoctor(username: string) : Observable<Patient[]> {
    return this.familyDoctorResourceService.loadAllPatientsRegisteredAtAGivenFamilyDoctor(username)
      .pipe(tap((patients : Patient[]) => this.patientRegisteredAtAGivenFamilyDoctor$.next(patients)));
  }
}
